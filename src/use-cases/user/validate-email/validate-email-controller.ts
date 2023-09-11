import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ValidateEmail } from "./validate-email";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";

const querySchema = z.object({
  token: z.string(),
});

export default class ValidateEmailController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = querySchema.parse(req.query);

      if (!token) {
        return res.status(401).json({
          error: "Não foi possivel validar o email",
        });
      }

      const showUserPerIdRepository = new PostgresShowUserPerUserIdRepository();
      const verifyEmail = new ValidateEmail(showUserPerIdRepository);

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
