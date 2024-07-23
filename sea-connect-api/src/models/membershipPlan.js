import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class MembershipPlan {
  static async getActiveMembershipPlans() {
    try {
      const activeMembershipPlans = await prisma.membershipPlans.findMany({
        where: {
          status: 'ACTIVE',
        },
      });
      return activeMembershipPlans;
    } catch (error) {
      throw error;
    }
  }

  static async getAllMembershipPlans() {
    try {
      const allMembershipPlans = await prisma.membershipPlans.findMany();
      return allMembershipPlans;
    } catch (error) {
      throw error;
    }
  }

  static async createMembershipPlan(data) {
    try {
      const membershipPlan = await prisma.membershipPlans.create({
        data: data
      });
      return membershipPlan;
    } catch (error) {
      throw error;
    }
  }

  static async updateMembershipPlan(membershipPlanId, data) {
    try {
      const updatedMembershipPlan = await prisma.membershipPlans.update({
        where: {
          id: membershipPlanId
        },
        data: data
      });
      return updatedMembershipPlan;
    } catch (error) {
      throw error;
    }
  }

}

export default MembershipPlan
