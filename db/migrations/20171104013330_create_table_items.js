'use strict'

module.exports = (app) => {
  app.locals.db.run(`
CREATE TABLE IF NOT EXISTS items (
  container varchar(7),
  title varchar(100) UNIQUE ON CONFLICT IGNORE,
  price integer DEFAULT 0
);
  `)
}
