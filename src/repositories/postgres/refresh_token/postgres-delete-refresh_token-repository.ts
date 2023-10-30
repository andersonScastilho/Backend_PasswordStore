import { prismaClient } from "database/prisma-client";
import { InternalServerError } from "helpers/classes/InternalServerError";
import { DeleteRefreshTokenRepository } from "repositories/refresh_token/delete-refresh_token-repository";

export class PostgresDeleteRefreshTokenRepository
  implements DeleteRefreshTokenRepository
{
  async delete(userId: string): Promise<void> {
    try {
      await prismaClient.refresh_Token.deleteMany({
        where: {
          userId: userId,
        },
      });

      return;
    } catch (error) {
      throw new InternalServerError(
        "An unexpected error occurred, please try again later"
      );
    }
  }
}
