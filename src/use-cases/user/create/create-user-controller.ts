import { Request, Response } from "express";

import { CreateUser } from "./create-user";
import { PostgresUserRepository } from "repositories/postgres/user/postgres-user-repository";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { email, fullName, password } = req.body;

    try {
      const userRepository = new PostgresUserRepository();
      const createUser = new CreateUser(userRepository);

      const user = await createUser.execute({
        userEmail: email,
        userFullName: fullName,
        userPassword: password,
      });

      return res.status(200).json({
        email: user.userEmail,
        fullName: user.userFullName,
        id: user.userId,
      });
    } catch (e) {
      return res.status(400).json({
        error: "Não foi possivel criar o usuario",
      });
    }
  }
}
