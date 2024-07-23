import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class VoteRound {

  static async getRound(roundId) {
    try {
      const round = await prisma.voteRounds.findFirst({
        where: {
          id: roundId
        }
      });

      if (!round) throw new Error("Round not found with Round ID")

      return round
    } catch (error) {
      throw error;
    }
  }

  static async createRound(data) {
    try {
      const vote = await prisma.votes.findFirst({
        where: {
          id: data.voteId
        }
      });
      const totalRounds = vote.totalRounds

      const rounds = await prisma.voteRounds.findMany({
        where: {
          voteId: data.voteId
        }
      })

      if ((totalRounds === 2 && rounds.length >= 2) || (totalRounds === 1 && rounds.length >= 1)) { 
        throw new Error('Already enough rounds')
      }

      data.roundNumber = rounds.length == 0 ? 'FIRST' : 'SECOND'

      const voteRound = await prisma.voteRounds.create({
        data: data
      });

      return voteRound;
    } catch (error) {
      throw error;
    }
  }

  static async getActiveRounds() {
    try {
      const rounds = await prisma.voteRounds.findMany({
        where: {
          startDate: {
            lte: new Date()
          },
          endDate: {
            gte: new Date()
          }
        }
      });

      return rounds;
    } catch (error) {
      throw error;
    }
  }

  static async getCompletedVotes() {
    try {
      const rounds = await prisma.voteRounds.findMany({
        where: {
          endDate: {
            lte: new Date()
          }
        }
      });

      return rounds;
    } catch (error) {
      throw error;
    }
  }

  static async updateRound(roundId, data) {
    try {
      const round = await prisma.voteRounds.update({
        where: {
          id: roundId
        },
        data: data
      });

      return round;
    } catch (error) {
      throw error;
    }
  }
}

export default VoteRound
