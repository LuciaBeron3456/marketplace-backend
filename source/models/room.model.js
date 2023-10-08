const { Model, DataTypes, Sequelize } = require('sequelize')

const ROOM_TABLE = 'rooms'

const RoomSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  participants: {
    allowNull: true,
    type: DataTypes.ARRAY(DataTypes.INTEGER),

    defaultValue: []
  }
}

class Room extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: ROOM_TABLE,
      modelName: 'Room',
      timestamps: false
    }
  }
}

module.exports = { Room, RoomSchema, ROOM_TABLE }
