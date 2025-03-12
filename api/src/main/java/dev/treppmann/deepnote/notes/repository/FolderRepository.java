package dev.treppmann.deepnote.notes.repository;

import dev.treppmann.deepnote.notes.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FolderRepository extends JpaRepository<Folder, Integer> {
    List<Folder> findAllByUserId(UUID userId);
    Optional<Folder> findByIdAndUserId(Integer folderId, UUID userId);
}
