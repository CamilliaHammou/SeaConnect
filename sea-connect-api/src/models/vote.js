import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Vote {
  static async createVote(data) {
    try {
      if (data.totalRounds > 2) {
        throw new Error("Total Round Must be smaller then 2")
      }

      const vote = await prisma.votes.create({
        data: data
      })

      return vote;
    } catch (error) {
      throw error;
    }
  }

  static async getVote(voteId) {
    try {
      const vote = await prisma.votes.findFirst({
        where: {
          id: voteId
        }
      });

      return vote;
    } catch (error) {
      throw error;
    }
  }
}

export default Vote
