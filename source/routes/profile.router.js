const express = require('express')

const passport = require('passport')

const UserService = require('../services/user.service')

const router = express.Router()

const userService = new UserService()
router.get('/my-user',
  passport.authenticate('jwt', { session: false }),
  async (request, response, next) => {
    try {
      const userPayload = request.user

      response.json(await userService.findOne(userPayload.sub))
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
