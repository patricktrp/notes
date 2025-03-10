package dev.treppmann.deepnote.notes;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FolderRepository extends JpaRepository<Folder, Integer> {
    List<Folder> findAllByUserId(UUID userId);
}
