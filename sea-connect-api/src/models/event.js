import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Event {

  static async getActiveEvents() {
    try {
      const activeEvents = await prisma.events.findMany({
        where: {
          eventDate: {
            gt: new Date(),
          },
        },
      });
      return activeEvents;
    } catch (error) {
      throw error;
    }
  }

  static async registerEvent(user, eventId) {
    const data = {
      memberID: user.id,
      memberEmail: user.email,
      eventID: eventId,
      registrationDate: new Date(),
      status: 'CONFIRMED'
    }

    try {
      const registration = await prisma.eventRegistrations.create({
        data: data
      });

      return registration;
    } catch (err) {
      throw err;
    }
  }

  static async getAllEvents() {
    try {
      const allEvents = await prisma.events.findMany();
      return allEvents;
    } catch (error) {
      throw error;
    }
  }

  static async createEvent(data) {
    try {
      const event = await prisma.events.create({
        data: data
      });
      return event;
    } catch (error) {
      throw error;
    }
  }

  static async updateEvent(eventId, data) {
    try {
      const updatedEvent = await prisma.events.update({
        where: {
          id: eventId
        },
        data: data
      });

      return updatedEvent;
    } catch (error) {
      throw error;
    }
  }

  static async deleteEvent(eventId) {
    try {
      const deletedEvent = await prisma.events.delete({
        where: {
          id: eventId
        }
      });

      return deletedEvent;
    } catch (error) {
      throw error;
    }
  }

  static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  
  }
}

export default Event
