const moment = require('moment-timezone')

function convertDateTimezone (date) {
  const dateConverted = date ? moment(date).tz('America/Argentina/Buenos_Aires').format() : null

  return dateConverted
}

module.exports = convertDateTimezone
