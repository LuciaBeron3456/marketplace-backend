const morgan = require('morgan')
const logger = require('../utils/logger')
const { settings } = require('../settings')

const stream = {
  write: (message) => logger.http(message)
}

const skip = () => {
  return settings.env !== 'dev'
}

const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)

module.exports = morganMiddleware
