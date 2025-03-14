import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useDeleteNote } from "@/hooks/use-delete-note";
import { NoteOverview } from "@/types/types";
import { useNavigate } from "react-router";

const NoteContextMenu = ({
  children,
  note,
}: {
  children: React.ReactNode;
  note: NoteOverview;
}) => {
  const navigate = useNavigate();
  const { mutate: deleteNote } = useDeleteNote();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => navigate(`/notes/${note.id}`)}>
          Open
        </ContextMenuItem>
        <ContextMenuItem onClick={() => deleteNote(note.id)}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default NoteContextMenu;
