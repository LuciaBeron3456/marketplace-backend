const express = require('express')
const passport = require('passport')
const AuthService = require('../services/auth.service')
const { settings } = require('../settings')

const router = express.Router()
const authService = new AuthService()

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (request, response, next) => {
    try {
      const user = request.user
      const token = await authService.signToken(user)
      response.json(token)
    } catch (error) {
      next(error)
    }
  })

router.get('/microsoft',
  passport.authenticate('microsoft', { session: false, prompt: 'select_account' })
)

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { session: false, failureRedirect: '/openscience/api/v1/auth/microsoft' }),
  async (request, response, next) => {
    try {
      const user = request.user

      const userString = JSON.stringify(await authService.signToken(user))

      let doctype

      if (settings.azureWindow.includes('5173')) {
        doctype = `
          <!DOCTYPE html>
          <html>
            <body>
            </body>
            <script>
              window.opener.postMessage(${userString}, "http://localhost:5173")
            </script>
          </html>
        `
      }

      response.send(doctype)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback', passport.authenticate('google', { session: false }), async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const token = await authService.signToken(req.user)

    // Close the popup window and send the token to the parent window
    const script = `
      <script>
        window.opener.postMessage(${JSON.stringify(token)}, "*");
        window.close();
      </script>
    `

    res.send(script)
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error)
  }
})

module.exports = router
