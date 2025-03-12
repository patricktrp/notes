package dev.treppmann.deepnote.notes.dto;

import java.util.List;

public record FolderTreeDTO(
        List<FolderDTO> folders,
        List<NoteOverviewDTO> notes
) {}
