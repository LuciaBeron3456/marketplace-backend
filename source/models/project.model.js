const { Model, DataTypes } = require('sequelize')

const PROJECT_TABLE = 'projects'

const ProjectSchema = {
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
  description: {
    type: DataTypes.TEXT
  },
  objectives: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  requirements: {
    type: DataTypes.TEXT
  },
  is_public: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  location: {
    allowNull: true,
    type: DataTypes.STRING
  },
  location_id: {
    allowNull: true,
    type: DataTypes.STRING
  },
  is_remote: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  files: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  science_branch: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  date_from: {
    allowNull: false,
    type: DataTypes.DATE
  },
  date_to: {
    allowNull: false,
    type: DataTypes.DATE
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  collaborators: {
    type: DataTypes.ARRAY(DataTypes.INTEGER)
  }
}

class Project extends Model {
  static associate (models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id'
    })

    // Add other associations as needed
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: PROJECT_TABLE,
      modelName: 'Project',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
}

module.exports = { Project, ProjectSchema, PROJECT_TABLE }
