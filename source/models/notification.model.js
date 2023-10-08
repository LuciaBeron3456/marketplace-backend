const { Model, DataTypes } = require('sequelize')

const NOTIFICATION_TABLE = 'notifications'

const NotificationType = {
  UNREAD_MESSAGE: 'UNREAD_MESSAGE',
  BUDGET_SENT: 'BUDGET_SENT',
  BUDGET_ACCEPTED: 'BUDGET_ACCEPTED'
}

const RecipientType = {
  CUSTOMER: 'customer',
  STORE: 'store'
}

const NotificationSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roomId: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  notificationType: {
    type: DataTypes.ENUM,
    values: Object.values(NotificationType),
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recipientType: {
    type: DataTypes.ENUM,
    values: Object.values(RecipientType),
    allowNull: false
  },
  recipientId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}

class Notification extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: NOTIFICATION_TABLE,
      modelName: 'Notification',
      timestamps: false
    }
  }
}

module.exports = { Notification, NotificationSchema, NOTIFICATION_TABLE, NotificationType, RecipientType }
