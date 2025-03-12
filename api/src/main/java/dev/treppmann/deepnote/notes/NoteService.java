package dev.treppmann.deepnote.notes;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@Slf4j
public class NoteService {
    private final FolderRepository folderRepository;
    private final NoteRepository noteRepository;

    public NoteService(FolderRepository folderRepository, NoteRepository noteRepository) {
        this.folderRepository = folderRepository;
        this.noteRepository = noteRepository;
    }

    public void moveNote(String userId, Integer noteId, Integer newFolderId) {
        UUID userUUID;
        try {
            userUUID = UUID.fromString(userId);
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user ID format");
        }

        Note note = noteRepository.findByIdAndUserId(noteId, userUUID)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found or does not belong to the user"));

        Folder folder = folderRepository.findByIdAndUserId(newFolderId, userUUID)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Folder not found or does not belong to the user"));

        note.setFolder(folder);
        noteRepository.save(note);
    }

    public void moveFolder(String userId, Integer folderId, Integer newParentFolderId) {
        UUID userUUID;
        try {
            userUUID = UUID.fromString(userId);
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user ID format");
        }

        Folder folder = folderRepository.findByIdAndUserId(folderId, userUUID)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Folder not found or does not belong to the user"));

        Folder newParentFolder = folderRepository.findByIdAndUserId(newParentFolderId, userUUID)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Target parent folder not found or does not belong to the user"));

        if (folder.getParentFolder() != null && folder.getParentFolder().getId().equals(newParentFolderId)) {
            return;
        }

        folder.setParentFolder(newParentFolder);
        folderRepository.save(folder);
    }

    public FolderTreeDTO getFolderTree(String userId) {
        UUID uuid = UUID.fromString(userId);
        List<Folder> folders = folderRepository.findAllByUserId(uuid);
        List<Note> notes = noteRepository.findAllByUserId(uuid);
        return buildFolderTree(folders, notes);
    }

    private FolderTreeDTO buildFolderTree(List<Folder> folders, List<Note> notes) {
        // Step 1: Create a map of folder IDs to FolderDTO objects for easy lookup
        Map<Integer, FolderDTO> folderMap = new HashMap<>();

        // Create FolderDTO objects for each folder and store them in the map
        for (Folder folder : folders) {
            folderMap.put(folder.getId(), new FolderDTO(
                    folder.getId(),
                    folder.getName(),
                    new ArrayList<>(),  // subFolders will be populated later
                    new ArrayList<>()   // notes will be populated later
            ));
        }

        // Step 2: Build the folder tree by setting up subfolders
        FolderTreeDTO folderTreeDTO = new FolderTreeDTO(new ArrayList<>(), new ArrayList<>());

        for (Folder folder : folders) {
            FolderDTO folderDTO = folderMap.get(folder.getId());

            // If the folder has a parent, add it as a subfolder to the parent
            if (folder.getParentFolder() != null) {
                FolderDTO parentFolderDTO = folderMap.get(folder.getParentFolder().getId());
                if (parentFolderDTO != null) {
                    parentFolderDTO.folders().add(folderDTO);  // Add as subfolder
                }
            } else {
                // If the folder has no parent (root folder), add it to the root folders list
                folderTreeDTO.folders().add(folderDTO);
            }
        }

        // Step 3: Assign notes to their respective folders
        for (Note note : notes) {
            Folder f = note.getFolder();
            Integer folderId = f != null ? f.getId() : null;
            if (folderId != null) {
                FolderDTO folderDTO = folderMap.get(folderId);
                if (folderDTO != null) {
                    // Add the note to the list of notes for the folder
                    folderDTO.notes().add(new NoteOverviewDTO(note.getId(), note.getName()));
                }
            } else {
                folderTreeDTO.notes().add(new NoteOverviewDTO(note.getId(), note.getName()));
            }
        }

        return folderTreeDTO;
    }
}
