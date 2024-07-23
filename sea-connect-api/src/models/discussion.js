import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Discussion {

  static async createDiscussion(data) {
    try {
      const discussion = await prisma.discussions.create({
        data: data
      });
      return discussion;
    } catch (error) {
      throw error;
    }
  }


  static async addComment(data) {
    try {
      const comment = await prisma.comments.create({
        data: data
      });
      return comment;
    } catch (error) {
      throw error;
    }
  }

  static async getComments(discussionId) {
    try {
      const comments = await prisma.comments.findMany({
        where: {
          discussionId: discussionId
        },
        orderBy: {
          date: 'desc'
        }
      });
      return comments;
    } catch (error) {
      throw error;
    }
  }

  static async deleteComment(commentId, user) {
    try {
      const comment = await prisma.comments.findUnique({
        where: {
          id: commentId
        }
      });
  
      if (!comment || comment.userId !== user.id) {
        throw new Error("Unauthorized: You can only delete your own comments.");
      }

      const deletedComment = await prisma.comments.delete({
        where: {
          id: commentId
        }
      });
  
      return deletedComment;
    } catch (error) {
      throw error;
    }
  }

  static async getAllDiscussions() {
    try {
      const discussions = await prisma.discussions.findMany({
        orderBy: {
          date: 'desc'
        }
      });
      return discussions;
    } catch (error) {
      throw error;
    }
  }
}

export default Discussion
