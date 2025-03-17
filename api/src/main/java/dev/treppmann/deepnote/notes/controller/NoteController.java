package dev.treppmann.deepnote.notes.controller;

import dev.treppmann.deepnote.notes.service.NoteService;
import dev.treppmann.deepnote.notes.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.security.Principal;
import java.util.UUID;

@RestController
@Slf4j
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/folders/tree")
    public FolderTreeDTO getFolderTree(Principal principal, @RequestParam(required = false, defaultValue = "NAME") SortBy sortBy, @RequestParam(required = false, defaultValue = "ASC") SortOrder sortOrder) {
        log.info("sortBy: {}, sortOrder: {}", sortBy, sortOrder);
        return noteService.getFolderTree(mapUserIdToUUID(principal.getName()), sortBy, sortOrder);
    }

    @GetMapping("/notes/{noteId}")
    public NoteDTO getNoteById(Principal principal, @PathVariable Integer noteId) {
        return noteService.getNoteById(mapUserIdToUUID(principal.getName()), noteId);
    }

    @PostMapping("/notes")
    @ResponseStatus(HttpStatus.CREATED)
    public NoteDTO createNote(Principal principal, @RequestBody @Valid CreateNoteRequest createNoteRequest) {
        return noteService.createNote(mapUserIdToUUID(principal.getName()), createNoteRequest);
    }

    @PostMapping("/folders")
    @ResponseStatus(HttpStatus.CREATED)
    public FolderDTO createFolder(Principal principal, CreateFolderRequest createFolderRequest) {
        return noteService.createFolder(mapUserIdToUUID(principal.getName()), createFolderRequest);
    }

    @PutMapping("/notes/{noteId}/move")
    public void moveNote(Principal principal, @PathVariable Integer noteId, @RequestBody @Valid MoveNoteRequest moveNoteRequest) {
        noteService.moveNote(mapUserIdToUUID(principal.getName()), noteId, moveNoteRequest);
    }

    @PutMapping("/folders/{folderId}/move")
    public void moveFolder(Principal principal, @PathVariable Integer folderId, @RequestBody @Valid MoveFolderRequest moveFolderRequest) {
        noteService.moveFolder(mapUserIdToUUID(principal.getName()), folderId, moveFolderRequest);
    }

    @PutMapping("/notes/{noteId}")
    public NoteDTO updateNoteById(Principal principal, @PathVariable Integer noteId, @RequestBody @Valid UpdateNoteRequest updateNoteRequest) {
        return noteService.updateNoteById(mapUserIdToUUID(principal.getName()), noteId, updateNoteRequest);
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
