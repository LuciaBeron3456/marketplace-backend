const { Sequelize } = require('sequelize')

const { settings } = require('../settings')

const setupModels = require('../models')

const user = encodeURIComponent(settings.dbUser)

const password = encodeURIComponent(settings.dbPassword)

const options = {
  host: settings.dbHost,

  dialect: 'postgres',

  logging: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 60000,
    idle: 2000
  }
}

const sequelize = new Sequelize(settings.dbName, user, password, options)

setupModels(sequelize)

sequelize.sync({ force: false })
module.exports = sequelize
