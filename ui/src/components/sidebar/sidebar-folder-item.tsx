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

  return (
    <SidebarMenuButton
      onClick={toggleCollapse}
      ref={setNodeRef}
      className={isOver ? "bg-muted" : ""}
    >
      <ChevronRight className="transition-transform" />
      <FolderIcon />
      {folder.name}
    </SidebarMenuButton>
  );
};

export default SidebarFolderItem;
