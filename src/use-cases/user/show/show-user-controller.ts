import { NextFunction, Request, Response } from "express";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import { ShowUser } from "./show-user";
import { z } from "zod";

const ParamsSchema = z.object({
  userId: z.string(),
});
export class ShowUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = ParamsSchema.parse(req.params);

      const userRepository = new PostgresShowUserPerUserIdRepository();

      const showUser = new ShowUser(userRepository);

      const user = await showUser.execute(userId);

      return res.status(200).json({
        email: user.userEmail,
        fullName: user.userFullName,
      });
    } catch (e) {
      next(e);
    }
  }
}
