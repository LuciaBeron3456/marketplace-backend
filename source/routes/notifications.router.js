const express = require('express')

const NotificationService = require('../services/notification.service')

const router = express.Router()

const service = new NotificationService()

router.get('/:customerId/:storeId', async (req, res, next) => {
  try {
    const { customerId, storeId } = req.params

    res.json(await service.find(customerId, storeId))
  } catch (error) {
    next(error)
  }
})

router.get('/:customerId/:storeId', async (req, res, next) => {
  try {
    const { customerId, storeId } = req.params

    res.json(await service.find(customerId, storeId))
  } catch (error) {
    next(error)
  }
})

router.get('/amount/:customerId/:storeId', async (req, res, next) => {
  try {
    const { customerId, storeId } = req.params

    res.json(await service.findAmount(customerId, storeId))
  } catch (error) {
    next(error)
  }
})

router.post('/clear', async (req, res, next) => {
  try {
    const { roomId } = req.body

    res.json(await service.clearRoomNotifications(roomId))
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    res.json(await service.update(id))
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body

    res.json(await service.create(body))
  } catch (error) {
    next(error)
  }
})

module.exports = router
