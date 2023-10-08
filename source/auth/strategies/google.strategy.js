const { Strategy } = require('passport-google-oauth20')
const { models } = require('../../libraries')
const { settings } = require('../../settings')

const options = {
  clientID: settings.googleClientID,
  clientSecret: settings.googleClientSecret,
  callbackURL: settings.googleCallbackURL
}

const GoogleStrategy = new Strategy(options, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile)

    const user = await models.User.findOne({
      where: {
        email: profile.emails[0].value,
        googleId: profile.id
      }
    })

    if (!user) {
      // Create a new user if not found
      const newUser = await models.User.create({
        email: profile.emails[0].value,
        googleId: profile.id
      })

      done(null, newUser.dataValues)
    } else {
      done(null, user)
    }
  } catch (error) {
    done(error, false)
  }
})

module.exports = GoogleStrategy
