import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { VerifyEmail } from "./verify-email";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import { validEmail, invalidEmail } from "../../../html/verifyEmail";
const paramRequest = z.string();

export default class VerifyEmailController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const token = paramRequest.parse(req.query.token);
      if (!token) {
        return res.status(401).send(`${invalidEmail}`);
      }

      const showUserPerIdRepository = new PostgresShowUserPerUserIdRepository();
      const verifyEmail = new VerifyEmail(showUserPerIdRepository);

      const fullFieldToken = `Bearer ${token}`;
      const isValidToken = await verifyEmail.execute(fullFieldToken);

      if (isValidToken === false) {
        return res.status(400).json({
          error: "Não foi possivel validar o email",
        });
      }

      return res.status(200).json({ message: "Email validado com sucesso" });
    } catch (e) {
      next(e);
    }
  }
}
