import { prismaClient } from "database/prisma-client";
import { DeleteRefreshTokenRepository } from "repositories/refresh_token/delete-refresh_token-repository";

export class PostgresDeleteRefreshTokenRepository
  implements DeleteRefreshTokenRepository
{
  async delete(userId: string): Promise<void> {
    await prismaClient.refresh_Token.deleteMany({
      where: {
        userId: userId,
      },
    });

    return;
  }
}
