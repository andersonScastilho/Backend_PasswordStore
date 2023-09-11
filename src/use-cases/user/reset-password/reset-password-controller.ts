import { NextFunction, Request, Response } from "express";
import { ResetPassword } from "./reset-password";
import { z } from "zod";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";

const querySchema = z.object({
  token: z.string(),
});
const bodySchema = z.object({
  newPassword: z.string().min(8),
});
export class ResetPasswordController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = querySchema.parse(req.query);
      const { newPassword } = bodySchema.parse(req.body);

      if (!token) {
        throw Error("Missing token to reset password");
      }

      if (!newPassword) {
        throw Error("Missing data");
      }

      const showUserPerUserIdRepository =
        new PostgresShowUserPerUserIdRepository();
      const resetPassword = new ResetPassword(showUserPerUserIdRepository);

      await resetPassword.execute(token, newPassword);

      return res.status(200).json({ message: "Senha atualizada com sucesso" });
    } catch (e) {
      next(e);
    }
  }
}
