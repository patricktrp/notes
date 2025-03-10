CREATE TABLE notes (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         user_id UUID NOT NULL,
                         folder_id INTEGER REFERENCES folders(id) ON DELETE CASCADE,
                         created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                         updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);