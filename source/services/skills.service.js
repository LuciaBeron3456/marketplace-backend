const { models } = require('../libraries')

const boom = require('@hapi/boom')

class SkillsService {
  async find (query) {
    const skill = await models.Skill.findAll()
    return skill
  }

  async findOne (id) {
    const skill = await models.Skill.findByPk(id)

    if (!skill) {
      throw boom.notFound('Usuario no encontrado')
    }

    return skill
  }

  async delete (id) {
    const skill = await this.findOne(id)

    if (!skill) {
      throw boom.notFound('Usuario no encontrado')
    }

    return {
      skill: skill.id,
      deleted: true
    }
  }

  async create (body) {
    const newSkill = await models.Skill.create(body)

    if (!newSkill) {
      throw boom.badRequest()
    }

    return { newSkill: newSkill.dataValues }
  }

  async update (id, body) {
    const skill = await this.findOne(id)

    if (!skill) {
      throw boom.notFound('skill not foundo')
    }

    const answer = await skill.update(body)

    return answer
  }

  async search (query) {
    const lowerQuery = query.toLowerCase()
    const skills = await models.Skill.findAll()
    const results = skills.filter(skill =>
      skill.name.toLowerCase().includes(lowerQuery)
    )
    return results
  }
}

module.exports = SkillsService
