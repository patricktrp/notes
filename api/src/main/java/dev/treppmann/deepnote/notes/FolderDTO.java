package dev.treppmann.deepnote.notes;

import java.util.List;

public class FolderDTO {
    Integer id;
    List<FolderDTO> subfolder;
    List<NoteOverviewDTO> notes;
}
