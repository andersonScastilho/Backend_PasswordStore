import { Request, Response } from "express";
import { RefreshToken } from "./refresh_token";
import { PostgresShowRefreshTokenRepository } from "repositories/postgres/refresh_token/postgres-show-refresh_token-repository";
import { PostgresCreateRefreshToken } from "repositories/postgres/refresh_token/postgres-create-refresh_token-repository";
import { PostgresDeleteRefreshTokenRepository } from "repositories/postgres/refresh_token/postgres-delete-refresh_token-repository";

export class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;

    try {
      const refreshTokenRepository = new PostgresShowRefreshTokenRepository();
      const createRefreshTokenRepository = new PostgresCreateRefreshToken();
      const deleteRefreshTokenRepository =
        new PostgresDeleteRefreshTokenRepository();

      const refreshToken = new RefreshToken(
        refreshTokenRepository,
        createRefreshTokenRepository,
        deleteRefreshTokenRepository
      );

      const token = await refreshToken.execute(refresh_token);

      return res.status(200).json({ token });
    } catch (e) {
      return res.status(400).json({
        error: "Não foi possivel autenticar-se",
      });
    }
  }
}
