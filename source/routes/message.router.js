const express = require('express')

const MessageService = require('../services/message.service')

const router = express.Router()

const service = new MessageService()

router.get('/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params
    const review = await service.findByRoomId(roomId)

    res.json(review)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body

    const createdReview = await service.create(body)

    res.json(createdReview)
  } catch (error) {
    next(error)
  }
})

router.get('/search/query', async (req, res, next) => {
  try {
    res.json(await service.search(req.query))
  } catch (error) {
    next(error)
  }
})

module.exports = router
