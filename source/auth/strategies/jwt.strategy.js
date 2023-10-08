const { Strategy, ExtractJwt } = require('passport-jwt')

const { settings } = require('../../settings')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: settings.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
})

module.exports = JwtStrategy
