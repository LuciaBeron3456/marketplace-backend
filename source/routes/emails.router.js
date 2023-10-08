const express = require('express')

const router = express.Router()

const { multer, bucket } = require('../middlewares/googleStorage.handler')

const boom = require('@hapi/boom')

const { format } = require('util')

router.post('/',
  multer.single('template'),
  async (request, response, next) => {
    try {
      const file = request.file

      if (!file) {
        throw boom.badRequest('No hay archivos cargados')
      }

      const ext = file.originalname.split('.').pop()

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      const filename = 'emails/' + file.fieldname + '-' + file.originalname.split('.').shift() + '-' + uniqueSuffix + '.' + ext

      const blob = bucket.file(filename.toLocaleLowerCase().replaceAll(' ', ''))

      const blobStream = blob.createWriteStream()

      blobStream.on('error', (error) => {
        console.error(error)
      })

      blobStream.on('finish', () => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)

        response.json({
          message: publicUrl
        })
      })

      blobStream.end(file.buffer)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
