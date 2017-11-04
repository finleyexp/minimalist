'use strict'

module.exports = (app) => {
  app.locals.db.run(`
CREATE TABLE IF NOT EXISTS items (
  title varchar(100),
  price integer DEFAULT 0
);
  `)
}
