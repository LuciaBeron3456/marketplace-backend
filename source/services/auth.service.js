const jwt = require('jsonwebtoken')
const { settings } = require('../settings')

class AuthService {
  async signToken (user) {
    const expirationTime = new Date()
    expirationTime.setHours(expirationTime.getHours() + 24)

    const payload = {
      sub: user.id,
      expirationTime
    }

    const accessToken = await jwt.sign(payload, settings.jwtSecret)

    return {
      user,
      accessToken
    }
  }
}

module.exports = AuthService
