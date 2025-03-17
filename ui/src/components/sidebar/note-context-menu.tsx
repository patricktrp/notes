import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useDeleteNote } from "@/hooks/use-delete-note";
import { NoteOverview } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router";

const NoteContextMenu = ({
  children,
  note,
  shouldConfirmNoteDeletion,
}: {
  children: React.ReactNode;
  note: NoteOverview;
  shouldConfirmNoteDeletion: boolean;
}) => {
  const navigate = useNavigate();
  const [showDeletionConfirmationDialog, setShowDeletionConfirmationDialog] =
    useState(false);
  const { mutate: deleteNote } = useDeleteNote();

  shouldConfirmNoteDeletion = true;

  const handleNoteDeletion = () => {
    if (shouldConfirmNoteDeletion) {
      setShowDeletionConfirmationDialog(true);
    } else {
      deleteNote(note.id);
    }
  };

  const confirmNoteDeletion = () => {
    deleteNote(note.id);
    setShowDeletionConfirmationDialog(false);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => navigate(`/notes/${note.id}`)}>
            Open
          </ContextMenuItem>
          <ContextMenuItem onClick={handleNoteDeletion}>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog
        open={showDeletionConfirmationDialog}
        onOpenChange={setShowDeletionConfirmationDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              delete this note?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col items-center w-full gap-y-3">
            <div className="flex items-center gap-x-2 w-full">
              <Checkbox id="dontAskAgain" />
              <label
                htmlFor="dontAskAgain"
                className="text-sm leading-none cursor-pointer"
              >
                Don't ask again
              </label>
            </div>

            <div className="flex items-center justify-end w-full gap-x-2">
              <Button
                variant="outline"
                onClick={() => setShowDeletionConfirmationDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={confirmNoteDeletion}>Confirm</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NoteContextMenu;
