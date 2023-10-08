const { models } = require('../libraries')
const { Op } = require('sequelize')

class MessageService {
  async findByRoomId (roomId) {
    const options = {
      where: {
        roomId
      }
    }

    const reviews = await models.Message.findAll(options)

    return reviews
  }

  async create (body) {
    const createdMessage = await models.Message.create(body)

    return createdMessage
  }

  async search (query) {
    const { message, roomId } = query
    const messages = await models.Message.findAll({
      where: {
        roomId,
        textMessage: {
          [Op.iLike]: `%${message}%`
        }
      },
      order: [['createdAt', 'DESC']]
    })
    return messages
  }
}

module.exports = MessageService
