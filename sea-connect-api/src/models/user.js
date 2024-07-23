import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_TEST_KEY);

const prisma = new PrismaClient();

class User {

  static async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async exists(email) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }

  static async create(email, password, firstName, lastName) {

    try {
      const customer = await stripe.customers.create({
        name: `${firstName} ${lastName}` , email
      });

      const user = await prisma.user.create({
          data: {
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
              role: 'USER',
              membershipStatus: 'INACTIVE',
              stripeId: customer.id
          }
      });
      return user;

    } catch (error) {
      throw error;
    }
  }

  static async update(user, data) {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          email: user.email
        },
        data: data
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async phoneExists(phone) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          phone: phone,
        },
      });

      return user;
    }

    catch(error) {
      throw error;
    }
  }

  static async delete(user) {
    try{
      const deleteUser = await prisma.user.delete({
        where: {
          email: user.email,
        },
      });
      return deleteUser;
    } catch (error) {
      throw error;
    }
  }
}

export default User
