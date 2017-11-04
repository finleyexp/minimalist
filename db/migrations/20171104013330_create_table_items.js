'use strict'

module.exports = (app) => {
  console.log('create_table_items ...')
  app.locals.db.serialize(() => {
    app.locals.db.run(`
CREATE TABLE IF NOT EXISTS items (
  title varchar(100),
  price integer DEFAULT 0
);
    `)
  })
  return true
}
