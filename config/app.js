'use strict'

/**
 * Dependencies
 */

const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')

/**
 * Constants
 */

const port = 53003
const base = path.join(__dirname, '..')
const env = process.env.NODE_ENV || 'development'
const views = path.join(base, '/app/views')

/**
 * Locals
 */

app.locals.port = port
app.locals.base = base
app.locals.env = env
app.locals.views = views

/**
 * Settings
 */

app.disable('x-powered-by')
app.set('env', env)

/**
 * View engine
 */

app.engine('html.ejs', ejs.renderFile)
app.set('view engine', '.html.ejs')
app.set('views', views)

/**
 * Routes
 */

app.get("/", (req, res) => {
  res.render('hello')
})

/**
 * Start server
 */

if (module === require.main) {
  app.listen(port, () => {
    console.log(`Running express.js app on port ${port}`)
  })
}

/**
 * Export app
 */

module.exports = app