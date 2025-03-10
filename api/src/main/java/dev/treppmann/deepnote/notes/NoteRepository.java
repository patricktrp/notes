package dev.treppmann.deepnote.notes;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findAllByUserId(UUID uuid);
}
