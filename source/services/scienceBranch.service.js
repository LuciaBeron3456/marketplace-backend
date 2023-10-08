const { models } = require('../libraries')

const boom = require('@hapi/boom')

class ScienceBranchService {
  async find (query) {
    const scienceBranch = await models.ScienceBranch.findAll()
    return scienceBranch
  }

  async findOne (id) {
    const scienceBranch = await models.ScienceBranch.findByPk(id)

    if (!scienceBranch) {
      throw boom.notFound('Usuario no encontrado')
    }

    return scienceBranch
  }

  async delete (id) {
    const scienceBranch = await this.findOne(id)

    if (!scienceBranch) {
      throw boom.notFound('Usuario no encontrado')
    }

    return {
      scienceBranch: scienceBranch.id,
      deleted: true
    }
  }

  async create (body) {
    const newScienceBranch = await models.ScienceBranch.create(body)

    if (!newScienceBranch) {
      throw boom.badRequest()
    }

    return { newScienceBranch: newScienceBranch.dataValues }
  }

  async update (id, body) {
    const invitation = await this.findOne(id)

    if (!invitation) {
      throw boom.notFound('scienceBranch not foundo')
    }

    const answer = await invitation.update(body)

    return answer
  }

  async search (query) {
    const lowerQuery = query.toLowerCase()
    const scienceBranches = await models.ScienceBranch.findAll()
    const results = scienceBranches.filter(branch =>
      branch.name.toLowerCase().includes(lowerQuery)
    )
    return results
  }
}

module.exports = ScienceBranchService
