const Multer = require('multer')

const { Storage } = require('@google-cloud/storage')

const { settings } = require('../settings')

// const storage = new Storage({ projectId: settings.googleCloudProjectId, credentials: { client_email: settings.googleCloudClientEmail, private_key: settings.googleCloudPrivateKey.split(String.raw`\n`).join('\n') } })

const storage = new Storage()

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

const bucket = storage.bucket(settings.googleCloudStorageBucket)

const bucketFiles = storage.bucket(settings.googleCloudStorageBucketFiles)

module.exports = { multer, bucket, bucketFiles }
