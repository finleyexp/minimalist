'use strict'

module.exports = (app) => {
  // check schema_migrations table for versions and match migrations
  // run any pending migrations using app.locals.db
  return true
}
