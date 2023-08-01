import { prismaClient } from "database/prisma-client";
import { UserSchema } from "models/user-schema";
import {
  ShowUserParams,
  ShowUserRepository,
} from "repositories/user/show-user-repository";

export class PostgresShowUserRepository implements ShowUserRepository {
  async show({ email, userId }: ShowUserParams): Promise<UserSchema | null> {
    const users = [];

    if (email) {
      const user = await prismaClient.users.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return null;
      }

      users.push(user);
    }

    if (userId) {
      const user = await prismaClient.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return null;
      }
      users.push(user);
    }
    return users[0];
  }
}
