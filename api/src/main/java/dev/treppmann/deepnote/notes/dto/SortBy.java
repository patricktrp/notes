package dev.treppmann.deepnote.notes.dto;

import lombok.Getter;

@Getter
public enum SortBy {
    NAME("name"),
    CREATED_AT("createdAt"),
    UPDATED_AT("updatedAt");

    private final String field;

    SortBy(String field) {
        this.field = field;
    }
}

