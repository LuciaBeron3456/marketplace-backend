const { Model, DataTypes, Sequelize } = require('sequelize')

const MESSAGE_TABLE = 'messages'

const MessageSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roomId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  textMessage: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Message extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: MESSAGE_TABLE,
      modelName: 'Message',
      timestamps: false
    }
  }
}

module.exports = { Message, MessageSchema, MESSAGE_TABLE }
