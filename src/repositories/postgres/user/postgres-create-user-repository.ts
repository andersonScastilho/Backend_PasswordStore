import { User } from "entities/User";

import { prismaClient } from "database/prisma-client";

import { CreateUserRepository } from "repositories/user/create-user-repository";

export class PostgresCreateUserRepository implements CreateUserRepository {
  async create(user: User): Promise<User> {
    const { userEmail, userFullName, userPassword, userId } = user;

    const createdUser = await prismaClient.users.create({
      data: {
        email: userEmail,
        fullName: userFullName,
        id: userId,
        password_hash: userPassword,
      },
    });

    if (!createdUser) {
      throw Error("Não foi possivel criar o usuario");
    }

    return user;
  }

  async verifyUserExist(email: string): Promise<User | null> {
    const user = await prismaClient.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    const userInstace = new User({
      userEmail: user.email,
      userFullName: user.fullName,
      userPassword: user.password_hash,
      userId: user.id,
    });

    return userInstace;
  }
}
