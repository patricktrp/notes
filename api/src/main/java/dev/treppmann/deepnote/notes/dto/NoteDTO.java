package dev.treppmann.deepnote.notes.dto;

import java.time.Instant;

public record NoteDTO(
    Integer id,
    String title,
    String content,
    Instant createdAt,
    Instant updatedAt
) {}
