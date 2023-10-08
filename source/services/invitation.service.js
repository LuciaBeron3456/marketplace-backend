const { models } = require('../libraries')

const { Op } = require('sequelize')

const boom = require('@hapi/boom')

class InvitationService {
  async find (query) {
    const options = {
      where: {}
    }
    const invitation = await models.Invitation.findAll(options)
    return invitation
  }

  async findOne (id) {
    const invitation = await models.Invitation.findByPk(id)

    if (!invitation) {
      throw boom.notFound('Invitation no encontrado')
    }

    return invitation
  }

  async delete (id) {
    const invitation = await this.findOne(id)

    if (!invitation) {
      throw boom.notFound('Usuario no encontrado')
    }

    return {
      invitation: invitation.id,
      deleted: true
    }
  }

  async create (body) {
    const newInvitation = await models.Invitation.create(body)

    if (!newInvitation) {
      throw boom.badRequest()
    }

    return { newInvitation: newInvitation.dataValues }
  }

  async update (id, body) {
    const invitation = await this.findOne(id)

    if (!invitation) {
      throw boom.notFound('Invitation not found')
    }

    const answer = await invitation.update(body)

    return answer
  }
}

module.exports = InvitationService
