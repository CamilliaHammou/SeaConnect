import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Assembly {

  static async createAssembly(data) {
    try {
      const assembly = await prisma.generalAssembly.create({
        data: data
      });
      return assembly;

    } catch (error) {
      throw error
    }
  }

  static async getAllAssemblies(user) {
    try {

      if(user.role === 'ADMIN') {
        const assemblies = await prisma.generalAssembly.findMany();
        return assemblies;
      }
      else {
        const assemblies = await prisma.generalAssembly.findMany({
          where: {
            date: {
              gte: new Date()
            },
            status: 'ONGOING'
          }
        });

        return assemblies;
      }
    } catch (error) {
      throw error
    }
  }

  static async updateAssembly(assemblyId, data) {
    try {
      const assembly = await prisma.generalAssembly.update({
        where: {
          id: assemblyId
        },
        data: data
      });
      return assembly;

    } catch (error) {
      throw error
    }
  }

  static async recordVote(assemblyId, userEmail, voteType) {
    try {

      const assembly = await prisma.generalAssembly.findUnique({
        where: {
          id: assemblyId
        }
      });

      const emailExists = assembly.votes.some(vote => vote.userEmail === userEmail);

      if (emailExists) throw new Error('User has already voted');

      const updatedAssembly = await prisma.generalAssembly.update({
        where: {
          id: assemblyId
        },
        data: {
          votes: {
            push: {
              userEmail: userEmail,
              voteType: voteType.toUpperCase(),
            },
          },
        },
      });

      return updatedAssembly;
    } catch (error) {
      throw error
    }
  }

  static async voteResult(assemblyId) {
    try {
      const assembly = await prisma.generalAssembly.findUnique({
        where: {
          id: assemblyId
        }
      });

      const votes = assembly.votes;

      const abstainVotes = votes.filter(vote => vote.voteType === 'ABSTAIN').length;
      const againstVotes = votes.filter(vote => vote.voteType === 'AGAINST').length;

      return { abstainVotes, againstVotes };
    } catch (error) {
      throw error
    }
  }
}

export default Assembly
