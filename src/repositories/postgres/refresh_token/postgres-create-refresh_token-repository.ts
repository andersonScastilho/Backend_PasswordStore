import { prismaClient } from "database/prisma-client";
import { RefreshTokenSchema } from "models/refresh_tokens-schema";
import { CreateRefreshTokenRepository } from "repositories/refresh_token/create-refresh_token-repository";

export class PostgresCreateRefreshToken
  implements CreateRefreshTokenRepository
{
  async create({
    expiresIn,
    id,
    userId,
  }: RefreshTokenSchema): Promise<RefreshTokenSchema> {
    const refreshToken = await prismaClient.refresh_Token.create({
      data: {
        expiresIn: expiresIn,
        id: id,
        userId: userId,
      },
    });

    return refreshToken;
  }
}
