package dev.treppmann.deepnote.notes;

import dev.treppmann.deepnote.notes.repository.FolderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import dev.treppmann.deepnote.notes.model.Folder;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class FolderRepositoryTest {

    @Autowired
    private FolderRepository folderRepository;

    private UUID userId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        Folder newFolder = new Folder();
        folderRepository.save(newFolder);
    }

    @Test
    void testFindAllByUserIdAndParentFolderIsNull() {
        // Call the method to test
        var folders = folderRepository.findAllByUserIdAndParentFolderIsNull(userId);

        // Verify the results
        assertThat(folders).hasSize(1);
        assertThat(folders.get(0).getName()).isEqualTo("Root Folder");
        assertThat(folders.get(0).getParentFolder()).isNull();
    }
}