'use strict'

module.exports = (app) => {
  app.locals.db.run(`
CREATE TABLE IF NOT EXISTS items (
  container text,
  title text UNIQUE ON CONFLICT IGNORE,
  price integer DEFAULT 0
);
  `)
}
