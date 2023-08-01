import { prismaClient } from "database/prisma-client";
import { UserSchema } from "models/user-schema";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";

export class PostgresShowUserPerUserIdRepository
  implements ShowUserPerUserIdRepository
{
  async show(userId: string): Promise<UserSchema | null> {
    const user = await prismaClient.users.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
