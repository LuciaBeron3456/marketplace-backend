const express = require('express')

const AdministratorService = require('../services/administrator.service')

const router = express.Router()

const service = new AdministratorService()

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find())
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    res.json(await service.findOne(id))
  } catch (error) {
    next(error)
  }
})

router.post('/',
  async (req, res, next) => {
    try {
      const body = req.body

      res.json(await service.create(body))
    } catch (error) {
      next(error)
    }
  })

router.patch('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params

      const body = req.body

      res.json(await service.update(id, body))
    } catch (error) {
      next(error)
    }
  })

router.delete('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params

      res.json(await service.delete(id))
    } catch (error) {
      next(error)
    }
  })

module.exports = router
