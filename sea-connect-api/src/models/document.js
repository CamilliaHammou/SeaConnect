import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Document {
  static async getDocument(title) {
    try {
      console.log("Available Prisma models:", Object.keys(prisma));
      const document = await prisma.documents.findUnique({
        where: {
          title: title
        }
      });
      return document;
    } catch (error) {
      throw error;
    }
  }

  static async createDocument(newDocument) {
    try {
      console.log("Available Prisma models:", Object.keys(prisma));
      const document = await prisma.documents.create({
        data: newDocument
      });
      return document;
    } catch (error) {
      throw error;
    }
  }

  static async getAllDocuments(user) {
    try {
      if (user.role.toLowerCase() === 'user') {
        const documents = await prisma.documents.findMany({
          where: {
            owner: 'USER'
          }
        });

        return documents;
      }

      const documents = await prisma.documents.findMany();
      return documents;
    } catch (error) {
      throw error;
    }
  }

  static async deleteDocument(title) {
    try {
      const document = await prisma.documents.findUnique({
        where: {
          title: title
        }
      });

      if (!document) {
        throw new Error("Document not found");
      }

      await prisma.documents.delete({
        where: {
          title: title
        }
      });

      return document;
    } catch (error) {
      throw error;
    }
  }
}

export default Document
