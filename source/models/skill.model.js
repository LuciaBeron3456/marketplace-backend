const { Model, DataTypes } = require('sequelize')

const SKILL_TABLE = 'skills'

const SkillSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}

class Skill extends Model {
  static associate (models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id'
    })
  }

  static config (sequelize) {
    return {
      hooks: {
        afterValidate: (skill, options) => {
          skill.name = skill.name.toUpperCase()
        }
      },
      sequelize,
      tableName: SKILL_TABLE,
      modelName: 'Skill',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
}

module.exports = { Skill, SkillSchema, SKILL_TABLE }
