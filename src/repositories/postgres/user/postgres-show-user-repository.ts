import { prismaClient } from "database/prisma-client";
import { User } from "entities/User";
import { ShowUserRepository } from "repositories/user/show-user-repository";

export class PostgresShowUserRepository implements ShowUserRepository {
  async show(email: string) {
    const user = await prismaClient.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
