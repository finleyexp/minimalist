'use strict'

module.exports = (app) => {
  console.log('create_table_containers ...')
  app.locals.db.run(`
CREATE TABLE IF NOT EXISTS containers (
  title varchar(7)
);
  `)
}
