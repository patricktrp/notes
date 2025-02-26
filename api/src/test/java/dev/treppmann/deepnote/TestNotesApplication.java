package dev.treppmann.deepnote;

import org.springframework.boot.SpringApplication;

public class TestNotesApplication {

	public static void main(String[] args) {
		SpringApplication.from(DeepNoteApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
