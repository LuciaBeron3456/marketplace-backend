const express = require('express')

const ProjectService = require('../services/project.service')

const router = express.Router()

const service = new ProjectService()

router.get('/', async (request, response, next) => {
  try {
    response.json(await service.find(request.query))
  } catch (error) {
    next(error)
  }
})

router.get('/user/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    response.json(await service.findByUserId(id))
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

    const newProject = await service.create(body)

    response.json(newProject)
  } catch (error) {
    next(error)
  }
})

module.exports = router
