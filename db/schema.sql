CREATE TABLE schema_migrations (
  version text UNIQUE ON CONFLICT IGNORE
);

CREATE TABLE containers (
  title text UNIQUE ON CONFLICT IGNORE
);

CREATE TABLE items (
  container text,
  title text UNIQUE ON CONFLICT IGNORE,
  price integer DEFAULT 0
);
