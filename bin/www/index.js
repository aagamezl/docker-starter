#!/usr/bin/env node
const http = require('http')

const app = require('./../../src/app')
const logger = require('./../../src/utils/logger')

const PORT = process.env.PORT || 3000

app.set('port', PORT)

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server')

  app.close(() => {
    logger.info('HTTP server closed')
  })
})

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof PORT === 'string'
    ? `Pipe ${PORT}`
    : `Port ${PORT}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`

  logger.info(`Listening on ${addr.address} ${bind}`)
}


// Create HTTP server.
const server = http.createServer(app)

server.listen(PORT, '::')
server.on('error', onError)
server.on('listening', onListening)
