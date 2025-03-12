import { Folder } from "@/types/types";
import { useDroppable } from "@dnd-kit/core";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronRight, Folder as FolderIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type SidebarFolderItemProps = {
  folder: Folder;
  toggleCollapse: () => void;
};

const SidebarFolderItem = ({
  folder,
  toggleCollapse,
}: SidebarFolderItemProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: folder.id });

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hasCollapsed, setHasCollapsed] = useState(false);

  useEffect(() => {
    if (isOver && !hasCollapsed) {
      // Clear the previous timeout if any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to trigger toggleCollapse after a delay
      timeoutRef.current = setTimeout(() => {
        toggleCollapse(); // Expand the folder
        setHasCollapsed(true); // Mark as collapsed to avoid multiple triggers
      }, 450); // Adjust the delay as necessary
    } else if (!isOver) {
      // Reset the state when the drag leaves the folder
      setHasCollapsed(false);
    }

    // Clean up timeout when the component unmounts or isOver changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOver, hasCollapsed, toggleCollapse]);

  return (
    <SidebarMenuButton
      onClick={toggleCollapse}
      ref={setNodeRef}
      className={isOver ? "bg-red-200" : ""}
    >
      <ChevronRight className="transition-transform" />
      <FolderIcon />
      {folder.name}
    </SidebarMenuButton>
  );
};

export default SidebarFolderItem;
