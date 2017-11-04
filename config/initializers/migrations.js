'use strict'

module.exports = (app) => {
  console.log('migrations')
  console.log(app.locals.db)
  return true
}
