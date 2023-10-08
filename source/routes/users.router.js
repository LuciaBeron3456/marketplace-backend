const express = require('express')

const UserService = require('../services/user.service')

const router = express.Router()

const service = new UserService()

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

router.patch('/:id', async (request, response, next) => {
  try {
    const body = request.body
    const { id } = request.params
    response.json(await service.update(id, body))
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

    const newUser = await service.create(body)

    response.json(newUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
