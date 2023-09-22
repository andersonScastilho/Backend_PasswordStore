import { NextFunction, Request, Response } from "express";
import { RefreshToken } from "./refresh_token";
import { PostgresShowRefreshTokenRepository } from "repositories/postgres/refresh_token/postgres-show-refresh_token-repository";
import { z } from "zod";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import Auth from "service/auth";

const ParamsSchema = z.object({
  refresh_token: z.string(),
});
export class RefreshTokenController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token } = ParamsSchema.parse(req.body);

      const refreshTokenRepository = new PostgresShowRefreshTokenRepository();
      const showUserPerUserIdRepository =
        new PostgresShowUserPerUserIdRepository();
      const auth = new Auth();

      const refreshToken = new RefreshToken(
        auth,
        refreshTokenRepository,
        showUserPerUserIdRepository
      );

      const token = await refreshToken.execute(refresh_token);

      return res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  }
}
