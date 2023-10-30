import { prismaClient } from "database/prisma-client";
import { InternalServerError } from "helpers/classes/InternalServerError";
import { RefreshTokenSchema } from "models/refresh_tokens-schema";
import { ShowRefreshTokenRepository } from "repositories/refresh_token/show-refresh_token-repository";

export class PostgresShowRefreshTokenRepository
  implements ShowRefreshTokenRepository
{
  async show(refresh_token: string): Promise<RefreshTokenSchema | null> {
    try {
      const refreshToken = await prismaClient.refresh_Token.findFirst({
        where: {
          id: refresh_token,
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
