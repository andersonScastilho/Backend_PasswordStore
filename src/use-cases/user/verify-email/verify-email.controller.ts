import { NextFunction, Request, Response } from "express";
import { PostgresShowUserPerEmailRepository } from "repositories/postgres/user/postgres-show-user-email-repository";
import { z } from "zod";
import { VerifyEmail } from "./verify-email";

const bodySchema = z.object({
  email: z.string().email(),
});

export default class VerifyEmailController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = bodySchema.parse(req.body);

      const showUserPerEmailRepository =
        new PostgresShowUserPerEmailRepository();

      const verifyEmail = new VerifyEmail(showUserPerEmailRepository);

      await verifyEmail.execute(email);

      return res.status(200).json({
        message: "Foi enviado um email para validar seu email é verdadeiro",
      });
    } catch (e) {
      next(e);
    }
  }
}
