import { Request, Response } from "express";

import { AuthUser } from "./auth-user";

import { PostgresShowUserPerEmailRepository } from "../../repositories/postgres/user/postgres-show-user-email-repository";
import { PostgresCreateRefreshToken } from "repositories/postgres/refresh_token/postgres-create-refresh_token-repository";
import { PostgresDeleteRefreshTokenRepository } from "repositories/postgres/refresh_token/postgres-delete-refresh_token-repository";
export class AuthController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Missing data",
        });
      }

      const userRepository = new PostgresShowUserPerEmailRepository();
      const createRefreshTokenRepository = new PostgresCreateRefreshToken();
      const deleteRefreshTokenRepository =
        new PostgresDeleteRefreshTokenRepository();

      const auth = new AuthUser(
        userRepository,
        createRefreshTokenRepository,
        deleteRefreshTokenRepository
      );

      const token = await auth.execute({ email, password });

      return res.status(200).json(token);
    } catch (e) {
      return res.status(401).json({
        error: "Não foi possivel se autenticar",
      });
    }
  }
}
