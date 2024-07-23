import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Contribution {

  static async getAllContributions(userEmail) {
    try {
      const contributions = await prisma.contribution.findMany();
      return contributions;
    } catch (error) {
      throw error;
    }
  }

  static async getUserContributions(userEmail) {
    try {
      const contributions = await prisma.contribution.findMany({
        where: {
          userEmail: userEmail
        }
      });
      return contributions;
    } catch (error) {
      throw error;
    }
  }

  static async createContribution(newContribution) {
    try {
      const contribution = await prisma.contribution.create({
        data: newContribution
      });
      return contribution;
    } catch (error) {
      throw error;
    }
  }
}

export default Contribution
