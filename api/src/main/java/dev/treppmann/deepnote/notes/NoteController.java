package dev.treppmann.deepnote.notes;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/folders")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/tree")
    public FolderTreeDTO getFolderTree(Principal principal) {
        return noteService.getFolderTree(principal.getName());
    }

    @GetMapping
    public void moveNote(Principal principal) {
        noteService.moveFolder(principal.getName(), 4, 6);
    }
}
