const { Strategy } = require('passport-microsoft')
const { models } = require('../../libraries')
const { settings } = require('../../settings')
const boom = require('@hapi/boom')

const options = {
  clientID: settings.azureClientID,
  clientSecret: settings.azureClientSecret,
  callbackURL: settings.azureCallbackURL,
  scope: ['user.read'],
  authorizationURL: settings.azureAuthorizationURL,
  tokenURL: settings.azureTokenURL
}

const MicrosoftStrategy = new Strategy(options,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { userPrincipalName: email } = profile._json

      const lowerEmail = email.toLowerCase()

      const administrator = await models.Administrators.findOne({ where: { email: lowerEmail } })

      if (!administrator) {
        throw boom.forbidden('Administrator not found.')
      }

      const user = await models.User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        const user = await models.User.create({
          email
        })

        done(null, user.dataValues)
      }

      done(null, user)
    } catch (error) {
      done(error, false)
    }
  }
)

module.exports = MicrosoftStrategy
