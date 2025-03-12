import { NoteOverview } from "@/types/types";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { File } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { NavLink } from "react-router";

type SidebarNoteItemProps = {
  note: NoteOverview;
};

const SidebarNoteItem = ({ note }: SidebarNoteItemProps) => {
  //   const { attributes, listeners, setNodeRef, transform, isDragging } =
  //     useDraggable({
  //       id: note.id,
  //     });

  //   const style = {
  //     ...(transform && {
  //       transform: `translate(${transform.x}px, ${transform.y}px)`,
  //     }),
  //     opacity: isDragging ? 0.62 : 1, // Adjust opacity when dragging
  //     transition: "transform 100ms ease", // Smooth transition when dragging
  //   };

  return (
    <NavLink to={`/notes/${note.id}`}>
      <SidebarMenuButton
        //   ref={setNodeRef}
        //   {...listeners}
        //   {...attributes}
        //   style={style}
        key={note.id}
        // isActive={name === "button.tsx"}
        className="data-[active=true]:bg-transparent"
      >
        <File />
        {note.title}
      </SidebarMenuButton>
    </NavLink>
  );
};

export default SidebarNoteItem;
