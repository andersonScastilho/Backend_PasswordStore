import { User } from "entities/User";

import { prismaClient } from "database/prisma-client";

import { UserRepository } from "repositories/user-repository";

export class PostgresCreateUserRepository implements UserRepository {
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
    return null;
  }
}
