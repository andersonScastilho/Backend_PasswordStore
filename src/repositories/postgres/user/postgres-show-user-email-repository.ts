import { prismaClient } from "database/prisma-client";
import { UserSchema } from "models/user-schema";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

export class PostgresShowUserPerEmailRepository
  implements ShowUserPerEmailRepository
{
  async show(email: string): Promise<UserSchema | null> {
    const user = await prismaClient.users.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
