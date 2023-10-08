const { Model, DataTypes } = require('sequelize')

const INVITATION_TABLE = 'invitations'

const InvitationSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  project_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  accepted: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING
  }
}

class Invitation extends Model {
  // Add other associations as needed

  static config (sequelize) {
    return {
      sequelize,
      tableName: INVITATION_TABLE,
      modelName: 'Invitation',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
}

module.exports = { Invitation, InvitationSchema, INVITATION_TABLE }
