const { models } = require('../libraries')

const { Op } = require('sequelize')

const boom = require('@hapi/boom')

class ProjectService {
  async find (query) {
    const options = {
      where: {}
    }

    const { name, dateFrom, dateTo, location, orderBy, offset } = query

    if (name) {
      options.where.name = {
        [Op.iLike]: `%${name}%`
      }
    }

    if (dateFrom) {
      options.where.dateFrom = {
        [Op.gte]: dateFrom
      }
    }

    if (location) {
      options.where.location = {
        [Op.iLike]: `%${location}%`
      }
    }

    if (dateTo) {
      options.where.dateTo = {
        [Op.lte]: dateTo
      }
    }

    if (orderBy) {
      if (orderBy === 'relevance') {

      }

      if (orderBy === 'date') {
        options.order = [['created_at', 'DESC']]
      }
    }

    const projectOptions = {
      ...options,
      limit: 5,
      offset: offset || 0,
      is_public: true,
      where: {
        ...options.where,
        ...options.order
      }
    }

    const project = await models.Project.findAll(projectOptions)
    return project
  }

  async findOne (id) {
    const project = await models.Project.findByPk(id)

    if (!project) {
      throw boom.notFound('Usuario no encontrado')
    }

    return project
  }

  async findByUserId (id) {
    const projects = await models.Project.findAll({ where: { user_id: id } })

    if (!projects) {
      throw boom.notFound('Usuario no encontrado')
    }

    return projects
  }

  async delete (id) {
    const project = await this.findOne(id)

    if (!project) {
      throw boom.notFound('Usuario no encontrado')
    }

    return {
      project: project.id,
      deleted: true
    }
  }

  async create (body) {
    const newProject = await models.Project.create(body)

    if (!newProject) {
      throw boom.badRequest()
    }

    return { newProject: newProject.dataValues }
  }

  async update (id, body) {
    const invitation = await this.findOne(id)

    if (!invitation) {
      throw boom.notFound('Project not foundo')
    }

    const answer = await invitation.update(body)

    return answer
  }
}

module.exports = ProjectService
