import { NextFunction, Request, Response } from "express";
import { ResetPassword } from "./reset-password";
import { z } from "zod";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import { Unauthorized } from "helpers/classes/Unauthorized";
import { BadRequest } from "helpers/classes/BadRequest";
import AuthForgotPassword from "service/auth-forgotPassword";

const querySchema = z
  .object({
    token: z.string(),
  })
  .strict();
const bodySchema = z
  .object({
    newPassword: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
  })
  .strict();
export class ResetPasswordController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = querySchema.parse(req.query);
      const { newPassword } = bodySchema.parse(req.body);

      if (!token) {
        throw new Unauthorized("Missing token to reset password");
      }

      if (!newPassword) {
        throw new BadRequest("Missing data");
      }
      const auth = new AuthForgotPassword();

      const showUserPerUserIdRepository =
        new PostgresShowUserPerUserIdRepository();

      const resetPasswordService = new ResetPassword(
        auth,
        showUserPerUserIdRepository
      );

      await resetPasswordService.execute(token, newPassword);

      return res.status(200).json({ message: "Senha atualizada com sucesso" });
    } catch (e) {
      next(e);
    }
  }
}
