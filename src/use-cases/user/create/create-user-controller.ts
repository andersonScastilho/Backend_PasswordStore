import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { CreateUser } from "./create-user";
import { PostgresCreateUserRepository } from "repositories/postgres/user/postgres-create-user-repository";
import { PostgresShowUserPerEmailRepository } from "repositories/postgres/user/postgres-show-user-email-repository";
import { User } from "entities/user/User";

const requestBodySchema = z
  .object({
    email: z.string().email(),
    fullName: z.string(),
    password: z.string().min(8),
  })
  .strict();

export class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, fullName, password } = requestBodySchema.parse(req.body);

      const user = new User({
        email,
        fullName,
        password,
        userId: "",
        verifiedEmail: false,
      });

      const createUserRepository = new PostgresCreateUserRepository();
      const showUserPerEmailRepository =
        new PostgresShowUserPerEmailRepository();

      const createUserService = new CreateUser(
        user,
        createUserRepository,
        showUserPerEmailRepository
      );

      await createUserService.execute();

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: {
          email: user.userEmail,
          fullName: user.userFullName,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
