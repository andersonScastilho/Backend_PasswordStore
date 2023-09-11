import { NextFunction, Request, Response } from "express";
import { PostgresShowUserPerEmailRepository } from "repositories/postgres/user/postgres-show-user-email-repository";
import { ForgotPassword } from "./forgotPassword";
import { z } from "zod";
const BodySchema = z.object({
  email: z.string().email(),
});
export class ForgotPasswordController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = BodySchema.parse(req.body);

      if (!email) {
        return res.status(400).json({ error: "Missing data" });
      }

      const ShowUserPerEmailRepository =
        new PostgresShowUserPerEmailRepository();
      const forgotPassword = new ForgotPassword(ShowUserPerEmailRepository);

      await forgotPassword.execute(email);

      return res
        .status(200)
        .json({ message: "Foi enviado um e-mail para redefinir sua senha" });
    } catch (e) {
      next(e);
    }
  }
}
