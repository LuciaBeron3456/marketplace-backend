const { models } = require('../libraries')
const { Op } = require('sequelize')

class NotificationService {
  async find (customerId, storeId) {
    const notifications = await models.Notification.findAll({
      where: {
        [Op.or]: [
          {
            recipientType: 'store',
            recipientId: storeId
          },
          {
            recipientType: 'customer',
            recipientId: customerId
          }
        ]
      }
    })

    return notifications
  }

  async findAmount (customerId, storeId) {
    const notificationsStore = await models.Notification.findAll({
      where: {
        isRead: false,
        recipientType: 'store',
        recipientId: storeId,
        notificationType: {
          [Op.or]: ['UNREAD_MESSAGE', 'BUDGET_SENT', 'BUDGET_ACCEPTED']
        }
      }
    })

    const notificationsCustomer = await models.Notification.findAll({
      where: {
        isRead: false,
        recipientType: 'customer',
        recipientId: customerId,
        notificationType: {
          [Op.or]: ['UNREAD_MESSAGE', 'BUDGET_SENT', 'BUDGET_ACCEPTED']
        }
      }
    })

    return {
      notificationsStore: notificationsStore.length,
      notificationsCustomer: notificationsCustomer.length
    }
  }

  async create (body) {
    const notification = await models.Notification.create(body)
    return notification
  }

  async clearRoomNotifications (roomId) {
    const unreadNotifications = await models.Notification.findAll(
      {
        where: {
          roomId: parseInt(roomId),
          isRead: false
        }
      }
    )
    for (const notification of unreadNotifications) {
      await notification.update({ isRead: true })
    }

    return unreadNotifications
  }

  async update (id) {
    const notification = await models.Notification.findByPk(id)

    const updatedNotification = await notification.update({ isRead: true })

    return updatedNotification
  }
}

module.exports = NotificationService
