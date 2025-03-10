package dev.treppmann.deepnote.notes;

import java.util.List;

public record FolderTreeDTO(
        List<FolderDTO> folders,
        List<NoteOverviewDTO> notes
) {}
