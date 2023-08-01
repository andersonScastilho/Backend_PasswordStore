import { Request, Response } from "express";
import { PostgresShowUserRepository } from "repositories/postgres/user/postgres-show-user-repository";
import { ShowUser } from "./show-user";

export class ShowUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const userRepository = new PostgresShowUserRepository();

      const showUser = new ShowUser(userRepository);

      const user = await showUser.execute(userId);

      return res.status(200).json({ user });
    } catch (e) {
      return res.status(400).json({
        error: "Login required",
      });
    }
  }
}
