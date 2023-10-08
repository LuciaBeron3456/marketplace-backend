const winston = require('winston')
const { settings } = require('../settings')

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = () => {
  const isDev = settings.env === 'dev'

  return isDev ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `[${info.timestamp}] - ${info.level}: ${info.message}`
  )
)

const transports = [
  new winston.transports.Console()
]

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
})

module.exports = logger
