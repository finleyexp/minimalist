'use strict'

/**
 * Dependencies
 */

const express = require('express')
const app = express()

/**
 * Globals
 */

const port = 53003

/**
 * Routes
 */

app.get("/", (req, res) => {
  res.status(200).send('Hello, friend!')
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
