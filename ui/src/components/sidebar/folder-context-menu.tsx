import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useCreateNote } from "@/hooks/use-create-note";
import { useDeleteFolder } from "@/hooks/use-delete-folder";
import { Folder } from "@/types/types";

const FolderContextMenu = ({
  children,
  folder,
}: {
  children: React.ReactNode;
  folder: Folder;
}) => {
  const { mutate: deleteFolder } = useDeleteFolder();
  const { mutate: createNote } = useCreateNote();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => console.log("Open")}>
          Open
        </ContextMenuItem>
        <ContextMenuItem onClick={() => createNote(folder.id)}>
          New Note
        </ContextMenuItem>
        <ContextMenuItem onClick={() => console.log("Rename")}>
          Rename
        </ContextMenuItem>
        <ContextMenuItem onClick={() => deleteFolder(folder.id)}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FolderContextMenu;
