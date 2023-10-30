import { prismaClient } from "database/prisma-client";
import { InternalServerError } from "helpers/classes/InternalServerError";
import { UserSchema } from "models/user-schema";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";

export class PostgresShowUserPerUserIdRepository
  implements ShowUserPerUserIdRepository
{
  async show(userId: string): Promise<UserSchema | null> {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerError(
        "An unexpected error occurred, please try again later"
      );
    }
  }
}
