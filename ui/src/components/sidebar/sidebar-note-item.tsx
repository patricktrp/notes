import { NoteOverview } from "@/types/types";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { File } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

type SidebarNoteItemProps = {
  note: NoteOverview;
};

const SidebarNoteItem = ({ note }: SidebarNoteItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <SidebarMenuButton
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      key={note.id}
      style={style}
      // isActive={name === "button.tsx"}
      className="data-[active=true]:bg-transparent"
    >
      <File />
      {note.title}
    </SidebarMenuButton>
  );
};

export default SidebarNoteItem;
