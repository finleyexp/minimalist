'use strict'

const path = require('path')

module.exports = (app) => {
  // check schema_migrations table for versions and match migrations
  // run any pending migrations using app.locals.db
  require(path.join(app.locals.base, '/db/migrations/20171104013050_create_table_containers'))(app)
  return true
}
