import { prismaClient } from "database/prisma-client";
import { InternalServerError } from "helpers/classes/InternalServerError";
import { UserSchema } from "models/user-schema";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

export class PostgresShowUserPerEmailRepository
  implements ShowUserPerEmailRepository
{
  async show(email: string): Promise<UserSchema | null> {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          email: email,
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
