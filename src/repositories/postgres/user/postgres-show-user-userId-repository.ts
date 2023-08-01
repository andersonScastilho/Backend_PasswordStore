import { prismaClient } from "database/prisma-client";
import { UserSchema } from "models/user-schema";
import { ShowUserPeruserIdRepository } from "repositories/user/show-user-userId-repository";

export class PostgresShowUserRepository implements ShowUserPeruserIdRepository {
  async show(userId: string): Promise<UserSchema | null> {
    const user = await prismaClient.users.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
