import { NextFunction, Request, Response } from "express";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import { ShowUser } from "./show-user";
import { z } from "zod";

const ParamsSchema = z
  .object({
    userId: z.string(),
  })
  .strict();
export class ShowUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = ParamsSchema.parse(req.params);

      const userRepository = new PostgresShowUserPerUserIdRepository();

      const showUserService = new ShowUser(userRepository);

      const user = await showUserService.execute(userId);

      return res.status(200).json({
        message: "Usuario encontrado com sucesso",
        user: {
          email: user.userEmail,
          fullName: user.userFullName,
          id: userId,
          verifiedEmail: user.verifiedEmail,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
