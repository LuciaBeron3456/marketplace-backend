const { ValidationError } = require('sequelize')

const { AxiosError } = require('axios')

const { settings } = require('../settings')

const logger = require('../utils/logger')

const logErrors = (err, req, res, next) => {
  if (settings.env === 'dev') {
    logger.error(err)
  }

  next(err)
}

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err

    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

const ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }

  next(err)
}

const axiosErrorHandler = (err, req, res, next) => {
  if (err instanceof AxiosError) {
    res.status(500).json({
      statusCode: 500,
      message: err.response.data
    })
  }

  next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler, axiosErrorHandler }
