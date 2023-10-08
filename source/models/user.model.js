const { Model, DataTypes } = require('sequelize')

const USER_TABLE = 'users'

const UserSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  googleId: {
    allowNull: true,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING
  },
  availability_from: {
    type: DataTypes.DATE,
    allowNull: true
  },
  availability_to: {
    type: DataTypes.DATE,
    allowNull: true
    // true equals to indeterminate future
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [] // Set a default empty array if needed
  },
  science_branch: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  github_link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  linkedin_link: {
    type: DataTypes.STRING,
    allowNull: true
  }
}

class User extends Model {
  static associate (models) {
    // Add associations if needed
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
}

module.exports = { User, UserSchema, USER_TABLE }
