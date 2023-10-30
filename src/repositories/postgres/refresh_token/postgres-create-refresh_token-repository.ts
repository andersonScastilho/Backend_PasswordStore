import { prismaClient } from "database/prisma-client";
import { InternalServerError } from "helpers/classes/InternalServerError";
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
    try {
      const refreshToken = await prismaClient.refresh_Token.create({
        data: {
          expiresIn: expiresIn,
          id: id,
          userId: userId,
        },
      });

      return refreshToken;
    } catch (error) {
      throw new InternalServerError(
        "An unexpected error occurred, please try again later"
      );
    }
  }
}
