package dev.treppmann.deepnote.notes;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.security.Principal;
import java.util.UUID;

@RestController
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/folders/tree")
    public FolderTreeDTO getFolderTree(Principal principal) {
        return noteService.getFolderTree(mapUserIdToUUID(principal.getName()));
    }

    @PostMapping("/notes")
    @ResponseStatus(HttpStatus.CREATED)
    public void createNote(Principal principal, @RequestBody @Valid CreateNoteRequest createNoteRequest) {
        noteService.createNote(mapUserIdToUUID(principal.getName()), createNoteRequest);
    }

    @PostMapping("/folders")
    @ResponseStatus(HttpStatus.CREATED)
    public void createFolder(Principal principal) {

    }

    @PutMapping("/notes/{noteId}/move")
    public void moveNote(Principal principal, @PathVariable Integer noteId, @RequestBody @Valid MoveNoteRequest moveNoteRequest) {
        System.out.println("Moving note " + noteId + " to " + principal.getName());
        noteService.moveNote(mapUserIdToUUID(principal.getName()), noteId, moveNoteRequest);
    }

    @PutMapping("/folders/{folderId}/move")
    public void moveFolder(Principal principal, @PathVariable Integer folderId, @RequestBody @Valid MoveFolderRequest moveFolderRequest) {
        noteService.moveFolder(mapUserIdToUUID(principal.getName()), folderId, moveFolderRequest);
    }

    @DeleteMapping("/notes/{noteId}")
    public void deleteNotyById(Principal principal, @PathVariable Integer noteId) {
        noteService.deleteNoteById(mapUserIdToUUID(principal.getName()), noteId);
    }

    @DeleteMapping("/folders/{folderId}")
    public void deleteFolderById(Principal principal, @PathVariable Integer folderId) {
        noteService.deleteFolderById(mapUserIdToUUID(principal.getName()), folderId);
    }

    private UUID mapUserIdToUUID(String userId) {
        try {
            return UUID.fromString(userId);
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
