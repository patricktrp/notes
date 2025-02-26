CREATE TABLE folders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL,
    parent_folder INTEGER REFERENCES folders(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT fk_no_self_reference CHECK (id <> parent_folder)
);