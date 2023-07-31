import { Request, Response } from "express";

import { CreateUser } from "./create-user";
import { PostgresCreateUserRepository } from "repositories/postgres/user/postgres-create-user-repository";
import { PostgresShowUserRepository } from "repositories/postgres/user/postgres-show-user-repository";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { email, fullName, password } = req.body;

    try {
      const createUserRepository = new PostgresCreateUserRepository();
      const showUserRepository = new PostgresShowUserRepository();

      const createUser = new CreateUser(
        createUserRepository,
        showUserRepository
      );

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
