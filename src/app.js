const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const { routes } = require('./api/v1.0.0')

// for parsing application/json
app.use(express.json())

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount api v1 routes
app.use('/v1.0.0', routes)

module.exports = app
