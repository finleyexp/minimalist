'use strict'

const path = require('path')
const fs = require('fs')

module.exports = (app) => {
  let migrations = []
  let version

  let files = fs.readdirSync(path.join(app.locals.base, '/db/migrations'))
  for (let i=0; i < files.length; i++) {
    if (/\d+/.test(files[i])) {
      version = files[i].match(/\d+/)[0]
      migrations.push({version: version, filename: files[i]})
    }
  }

  app.locals.db.get
  // check schema_migrations table for run versions
  // run any pending migrations using app.locals.db
  require(path.join(app.locals.base, '/db/migrations/20171104013050_create_table_containers'))(app)

  return true
}
