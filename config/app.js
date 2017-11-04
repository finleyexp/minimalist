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

/**
 * Locals
 */

app.locals.title = title
app.locals.port = port
app.locals.base = base
app.locals.env = env
app.locals.views = views
app.locals.db = require('./db')(app)

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
 * Initializers
 */

require(path.join(base, '/config/initializers/migrations'))(app)

/**
 * Middleware
 */

app.use(require(base + '/lib/middleware/json_body_parser'))
app.use(require(base + '/lib/middleware/urlencoded_body_parser'))

/**
 * Routes
 */

app.get("/", (req, res, next) => {
  req.app.locals.db.all("SELECT title FROM containers;", (err, rows) => {
    if (err) { next(err) }
    res.render('hello', {
      xl_containers: rows
    })
  })
})
app.get("/containers/:name", (req, res) => {
  res.render('containers/show', {
    container: req.params.name
  })
})
app.post("/containers", (req, res) => {
  req.app.locals.db.get("SELECT COUNT(*) AS count FROM containers", (err, row) => {
    let container = 'x'.repeat(row.count + 1) + 'l'
    req.app.locals.db.run("INSERT INTO containers VALUES (?)", [container], () => {
      res.sendStatus(200)
    })
  })
})
app.post("/containers/:name/items", (req, res) => {
  if (req.body.constructor === Object) {
    let keys = Object.keys(req.body)
    if (keys.includes('title') && keys.includes('price')) {
      req.app.locals.db.run(`
        INSERT INTO items (
          container,
          title,
          price
        ) VALUES (?, ?, ?);`, [
        req.params.name,
        req.body.title,
        req.body.price
      ], () => {
        res.redirect(req.path)
      })
    }
  }
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
  const server = app.listen(port, () => {
    console.log(`Running express.js app on port ${port}`)
  })
  process.on('SIGINT', () => {
    server.close(() => {
      app.locals.db.close()
    })
  })
  process.on('SIGTERM', () => {
    server.close(() => {
      app.locals.db.close()
    })
  })
}

/**
 * Export app
 */

module.exports = app
