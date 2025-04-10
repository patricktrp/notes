package dev.treppmann.deepnote.notes;

import java.util.List;

public record FolderDTO(
        Integer id,
        String name,
        List<FolderDTO> folders,
        List<NoteOverviewDTO> notes
) {
}
