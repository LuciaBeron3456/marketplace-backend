const express = require('express')

const SearchService = require('../services/search.service')

const router = express.Router()

const service = new SearchService()

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find(req.query))
  } catch (error) {
    next(error)
  }
})

module.exports = router
