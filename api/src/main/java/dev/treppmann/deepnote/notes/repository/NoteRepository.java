package dev.treppmann.deepnote.notes.repository;

import dev.treppmann.deepnote.notes.model.Note;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findAllByUserId(UUID uuid, Sort sort);
    Optional<Note> findByIdAndUserId(Integer noteId, UUID userId);
    List<Note> findByUserIdAndNameStartingWith(UUID userId, String name);
}
