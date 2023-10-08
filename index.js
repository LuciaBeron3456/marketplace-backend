const express = require('express')

const logger = require('./source/utils/logger')

const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler, axiosErrorHandler } = require('./source/middlewares/error.handler')

const routerAPI = require('./source/routes')

const { settings } = require('./source/settings')

const http = require('http')

const app = express()

const port = settings.port

const { Server } = require('socket.io')

const server = http.createServer(app)

const whitelist = ['http://localhost:5173']

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed By CORS'))
    }
  }
}

app.use(cors(options))

app.use(express.json())

require('./source/auth')

app.get('/openscience', (req, res) => {
  res.send('Hola mi server en express')
})

routerAPI(app)

app.use(logErrors)

app.use(axiosErrorHandler)

app.use(ormErrorHandler)

app.use(boomErrorHandler)

app.use(errorHandler)

app.listen(port, () => {
  logger.info(`Application running in port: ${port}`)
})

const io = new Server(server, {
  cors: {
    origin: 'https://localhost:5173',
    methods: ['GET', 'POST']
  },
  path: '/socket'
})

io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`)

  socket.on('join_room', (data) => {
    socket.join(data)
  })

  socket.on('send_message', (data) => {
    socket.to(parseInt(data.currentRoom)).emit('receive_message', { message: data?.message, userId: data?.userId })
  })
})

server.listen(3001, () => {
  logger.info('Server running in port: 3001')
})
