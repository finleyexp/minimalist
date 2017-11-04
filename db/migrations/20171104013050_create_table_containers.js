'use strict'

module.exports = (app) => {
  app.locals.db.run(`
CREATE TABLE IF NOT EXISTS containers (
  title varchar(7)
);
  `)
}
