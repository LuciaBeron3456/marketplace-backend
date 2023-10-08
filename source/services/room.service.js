const { models } = require('../libraries')
const { Op } = require('sequelize')

const boom = require('@hapi/boom')

class RoomService {
  async findByRoomId (id) {
    const rooms = await models.Room.findByPk(id)

    return rooms
  }

  async findByUserId (id) {
    const rooms = await models.Room.findAll({
      where: {
        participants: { [Op.contains]: [id] }
      }
    })
    return rooms
  }

  async create (body) {
    try {
      const room = await models.Room.create(body)
      return room
    } catch (error) {
      throw boom.badRequest('No se puedo crear la sala')
    }
  }
}

module.exports = RoomService
