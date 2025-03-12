package dev.treppmann.deepnote.notes.dto;

import java.time.Instant;

public record NoteOverviewDTO(
        Integer id,
        String title,
        Instant createdAt,
        Instant updatedAt
) {}
