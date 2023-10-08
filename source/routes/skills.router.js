const express = require('express')

const SkillsService = require('../services/skills.service')

const router = express.Router()

const service = new SkillsService()

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

    const newSkill = await service.create(body)

    response.json(newSkill)
  } catch (error) {
    next(error)
  }
})

router.get('/search/query', async (request, response, next) => {
  try {
    const { query } = request.query

    const results = await service.search(query)

    response.json(results)
  } catch (error) {
    next(error)
  }
})
module.exports = router
