package dev.treppmann.deepnote.notes;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/folders")
public class FolderController {
    @GetMapping
    public List<Object> getRootFolders() {
        return List.of();
    }

    @GetMapping("/:folderId")
    public Object getFolderById() {
        return null;
    }
}
