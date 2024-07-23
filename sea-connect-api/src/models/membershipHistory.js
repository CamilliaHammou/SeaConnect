import { PrismaClient } from '@prisma/client';
import User from './user.js';

const prisma = new PrismaClient();

class MemberShipHistory {

  static async getMembershipHistory(userEmail) {
    try {
      const memberships = await prisma.membershipHistory.findMany({
        where: {
          userEmail: userEmail
        }
      });
      return memberships;
    } catch (error) {
      throw error;
    }
  }

  static async createMembership(user, data) {
    let endDate = new Date();
    let startDate = new Date();
    if (data.membershipType.toUpperCase() === 'MONTHLY') endDate = this.addMonths(endDate, 1);
    if (data.membershipType.toUpperCase() === 'ANNUAL') endDate = this.addYears(endDate, 1);
    if (data.membershipType.toUpperCase() === 'LIFETIME') endDate = this.addYears(endDate, 70);


    try {
      const membership = await prisma.membershipHistory.create({
        data: {
          membershipPlanId: data.membershipPlanId,
          userID: user.id,
          userEmail: user.email,
          startDate: startDate,
          endDate: endDate,
          membershipType: data.membershipType
        }
      });

      await User.update(user, {membershipStatus: 'ACTIVE', membershipStartDate: startDate})
      return membership;
    } catch (error) {
      throw error;
    } 
  }

  static addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  static addYears(date, years) {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }
}

export default MemberShipHistory
