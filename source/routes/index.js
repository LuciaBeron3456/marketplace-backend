const express = require('express')

const usersRouter = require('./users.router')
const authRouter = require('./auth.router')
const profileRouter = require('./profile.router')
const projectsRouter = require('./projects.router')
const invitationsRouter = require('./invitations.router')
const scienceBranch = require('./scienceBranch.router')
const skillsRouter = require('./skills.router')
const roomsRouter = require('./room.router')

function routerAPI (app) {
  const router = express.Router()

  app.use('/openscience/api/v1', router)

  router.use(express.static('./uploads'))
  router.use('/users', usersRouter)
  router.use('/auth', authRouter)
  router.use('/profile', profileRouter)
  router.use('/projects', projectsRouter)
  router.use('/invitations', invitationsRouter)
  router.use('/scienceBranch', scienceBranch)
  router.use('/skills', skillsRouter)
  router.use('/rooms', roomsRouter)
}

module.exports = routerAPI
