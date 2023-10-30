import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ValidateEmail } from "./validate-email";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import { Unauthorized } from "helpers/classes/Unauthorized";
import AuthVerifyEmail from "service/auth-verifyEmail";

const querySchema = z
  .object({
    token: z.string(),
  })
  .strict();

export default class ValidateEmailController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = querySchema.parse(req.query);

      if (!token) {
        throw new Unauthorized("Token required");
      }
      const authVerifyEmail = new AuthVerifyEmail();

      const showUserPerIdRepository = new PostgresShowUserPerUserIdRepository();
      const validateEmailService = new ValidateEmail(
        authVerifyEmail,
        showUserPerIdRepository
      );

      const fullFieldToken = `Bearer ${token}`;
      const isValidToken = await validateEmailService.execute(fullFieldToken);

      if (isValidToken === false) {
        throw new Unauthorized("Não foi possivel validar o token");
      }

      return res.status(200).json({ message: "Email validado com sucesso" });
    } catch (e) {
      next(e);
    }
  }
}
