DROP TABLE IF EXISTS status CASCADE;

CREATE TABLE status (
  id SERIAL PRIMARY KEY NOT NULL,
  code_name VARCHAR(255) NOT NULL
)