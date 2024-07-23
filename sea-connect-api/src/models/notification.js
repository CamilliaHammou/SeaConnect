import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class Notification {
  static async createNotification(data) {
    try {
      const notification = await prisma.notifications.create({
        data: data
      });
      return notification;
    } catch (error) {
      throw error;
    }
  }

  static async markRead(notificationId, user) {
    try {
      const notification = await prisma.userNotifications.create({
        data: {
          userId: user.id,
          userEmail: user.email,
          notificationId: notificationId
        }
      });
      return notification;
    } catch (error) {
      throw error;
    }
  }

  static async getNotifications(user) {
    try {
      const userNotificationIds = await prisma.userNotifications.findMany({
        where: {
          userId: user.id
        },
        select: {
          notificationId: true
        }
      });
  
      const idsToExclude = userNotificationIds.map(un => un.notificationId);
      const unReadNotifications = await prisma.notifications.findMany({
        where: {
          id: { notIn: idsToExclude }
        }
      });
      
      const readNotifications = await prisma.notifications.findMany({
        where: {
          id: { in: idsToExclude }
        }
      });

      return { readNotifications, unReadNotifications };
    } catch (error) {
      throw error;
    }
  }
}

export default Notification
