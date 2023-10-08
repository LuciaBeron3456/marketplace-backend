const { models } = require('../libraries')

const boom = require('@hapi/boom')

class UserService {
  async find (query) {
    const users = await models.User.findAll({ where: { eliminado: false } })

    return users
  }

  async findOne (id) {
    const user = await models.User.findByPk(id)

    if (!user) {
      throw boom.notFound('Usuario no encontrado')
    }

    return user
  }

  async delete (id, clientIp) {
    const user = await this.findOne(id)

    if (!user) {
      throw boom.notFound('Usuario no encontrado')
    }

    return {
      user: user.id,
      deleted: true
    }
  }

  async findByEmail (email) {
    const user = await models.User.findOne({
      where: { email }
    })

    return user
  }

  async create (body) {
    const newUser = await models.User.create(body)

    if (!newUser) {
      throw boom.badRequest()
    }

    return { newUser: newUser.dataValues }
  }

  async register (payload) {
    const { email, rol } = payload.body

    const transaction = payload.transaction

    const newUser = await models.User.create({ userApiId: null, email, controlAcceso: rol }, { transaction })
    if (!newUser) {
      throw boom.badRequest()
    }

    return { newUser: newUser.dataValues }
  }

  async update (id, body) {
    const user = await this.findOne(id)

    if (!user) {
      throw boom.notFound('Usuario no encontrado')
    }

    const answer = await user.update(body)

    return answer
  }
}

module.exports = UserService
