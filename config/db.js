'use strict'

/**
 * Dependencies
 */

const sqlite3 = require('sqlite3')

/**
 * Initialize database
 */

const db = new sqlite3.Database()

/**
 * Export db
 */

module.exports = db
