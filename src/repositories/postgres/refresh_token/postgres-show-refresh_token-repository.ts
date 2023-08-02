import { prismaClient } from "database/prisma-client";
import { RefreshTokenSchema } from "models/refresh_tokens-schema";
import { ShowRefreshTokenRepository } from "repositories/refresh_token/show-refresh_token-repository";

export class PostgresShowRefreshTokenRepository
  implements ShowRefreshTokenRepository
{
  async show(refresh_token: string): Promise<RefreshTokenSchema | null> {
    const refreshToken = await prismaClient.refresh_Token.findFirst({
      where: {
        id: refresh_token,
      },
    });

    return refreshToken;
  }
}
