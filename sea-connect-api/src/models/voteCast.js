import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class VoteCast {
  static async exists(email, roundId) {
    const vote = await prisma.voteCast.findFirst({
      where: {
        voterEmail: email,
        roundId: roundId
      },
    });

    return vote;
  }

  static async castVote(data) {
    try {
      const voteCast = await prisma.voteCast.create({
        data: data
      });
      return voteCast;

    }catch (e) {
      throw e;
    }
  }

  static async getCastedVotes(roundId) {
    try {
      const votes = await prisma.voteCast.findMany({
        where: {
          roundId: roundId
        }
      });
      return votes;
    } catch (error) {
      throw error;
    }
  }
  
}

export default VoteCast
