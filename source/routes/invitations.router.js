const express = require('express')

const { models } = require('../libraries')

const InvitationService = require('../services/invitation.service')

const router = express.Router()

const service = new InvitationService()

router.get('/', async (request, response, next) => {
  try {
    response.json(await service.find(request.query))
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params

    response.json(await service.findOne(id))
  } catch (error) {
    next(error)
  }
})

router.patch('/delete/:id', async (request, response, next) => {
  try {
    const { id } = request.params

    response.json(await service.delete(id))
  } catch (error) {
    next(error)
  }
})

router.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const newInvitation = await service.create(body)

    const projectId = body.project_id

    const project = await models.Project.findByPk(projectId)

    const newRoom = await models.Room.create({ participants: [body.user_id, project.user_id] })

    const newMessage = await models.Message.create({ roomId: newRoom.id, textMessage: body.description, userId: body.user_id })

    response.json(newInvitation, newRoom, newMessage)
  } catch (error) {
    next(error)
  }
})

module.exports = router
