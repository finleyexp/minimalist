'use strict'

/**
 * Dependencies
 */

const express = require('express')
const path = require('path')
const ejs = require('ejs')

/**
 * Initialize app
 */

const app = express()

/**
 * Constants
 */

const title = "Minimalist"
const port = 53003
const base = path.join(__dirname, '..')
const env = process.env.NODE_ENV || 'development'
const views = path.join(base, '/app/views')
const db = require('./db')

/**
 * Locals
 */

app.locals.title = title
app.locals.port = port
app.locals.base = base
app.locals.env = env
app.locals.views = views
app.locals.db = db

/**
 * Settings
 */

app.set('env', env)
app.disable('x-powered-by')

/**
 * View engine
 */

app.engine('html.ejs', ejs.renderFile)
app.set('view engine', '.html.ejs')
app.set('views', views)

/**
 * Static assets
 */

app.use('/assets', express.static(base + '/node_modules/jquery/dist'))
app.use('/assets', express.static(base + '/node_modules/popper.js/dist/umd'))
app.use('/assets', express.static(base + '/node_modules/font-awesome'))
app.use('/assets', express.static(base + '/node_modules/bootstrap/dist'))
app.use('/assets/js', express.static(base + '/node_modules/turbolinks/dist'))

/**
 * Routes
 */

app.get("/", (req, res) => {
  res.render('hello')
})
app.get("/containers/:name", (req, res) => {
  res.render('containers/show', {
    container: req.params.name
  })
})
app.post("/containers", (req, res) => {
  // only create xl xxl xxl and so on
  res.sendStatus(200)
})
app.delete("/containers/:name", (req, res) => {
  // only remove xl xxl xxl and so on
  res.sendStatus(200)
})
app.post("/containers/:name", (req, res) => {
  // create Item { title: text, price: integer }
  res.sendStatus(200)
})
app.delete("/containers/:name/items/:id", (req, res) => {
  // remove Item
  res.sendStatus(200)
})

/**
 * Error handlers
 */

app.use(require(base + '/lib/middleware/page_not_found'))
app.use(require(base + '/lib/middleware/render_error'))

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
