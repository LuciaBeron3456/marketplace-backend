const express = require('express')

const RoomService = require('../services/room.service')

const router = express.Router()

const service = new RoomService()

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const rooms = await service.findByRoomId(id)

    res.json(rooms)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body

    const createdRoom = await service.create(body)

    res.json(createdRoom)
  } catch (error) {
    next(error)
  }
})

router.get('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const rooms = await service.findByUserId(id)

    res.json(rooms)
  } catch (error) {
    next(error)
  }
})

router.get('/search/query', async (req, res, next) => {
  try {
    res.json(await service.findBudgetRooms(req.query))
  } catch (error) {
    next(error)
  }
})

module.exports = router
