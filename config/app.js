'use strict'

/**
 * Dependencies
 */

const express = require('express')
const app = express()
const path = require('path')

/**
 * Globals
 */

const port = 53003
const base = path.join(__dirname, '..')
const env = process.env.NODE_ENV || 'development'

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
