const boom = require('@hapi/boom')

const checkApiKey = (request, response, next) => {
  if (request.url.includes('/auth/microsoft')) {
    next()
  } else if (request.url.includes('/auth/google')) {
    next()
  } else if (request.url.includes('/auth/google/callback')) {
    next()
  } else {
    next(boom.unauthorized())
  }
}

module.exports = { checkApiKey }
