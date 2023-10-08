const { Op } = require('sequelize')

const { models } = require('../libraries')

class SearchService {
  async find (query) {
    const options = {
      where: {},
      order: [['nombre', 'DESC']]
    }

    const { name } = query

    if (name) {
      options.where.nombre = {
        [Op.iLike]: `%${name}%`
      }
    }

    const productOptions = {
      ...options,
      limit: 8,
      offset: 0,
      where: {
        ...options.where,
        isBanned: false,
        isDeleted: false
      }
    }

    const products = await models.Product.findAll(productOptions)

    const categoryOptions = {
      ...options,
      limit: 3,
      offset: 0
    }

    const categoriesC = await models.CategoryC.findAll(categoryOptions)

    const storeOptions = {
      ...options,
      limit: 3,
      offset: 0,
      where: {
        ...options.where,
        isDeleted: false,
        isBanned: false
      }
    }

    const stores = await models.Store.findAll(storeOptions)

    return { products, categoriesC, stores }
  }
}

module.exports = SearchService
