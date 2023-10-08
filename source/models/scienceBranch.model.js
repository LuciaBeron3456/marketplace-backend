const { Model, DataTypes } = require('sequelize')

const SCIENCE_BRANCH_TABLE = 'science_branches'

const ScienceBranchSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  }
}

class ScienceBranch extends Model {
  static associate (models) {
    // Add associations if needed
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: SCIENCE_BRANCH_TABLE,
      modelName: 'ScienceBranch',
      timestamps: true,
      createdAt: false,
      updatedAt: false
    }
  }
}

module.exports = { ScienceBranch, ScienceBranchSchema, SCIENCE_BRANCH_TABLE }
