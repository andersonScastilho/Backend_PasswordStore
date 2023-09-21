import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { CreateUser } from "./create-user";
import { PostgresCreateUserRepository } from "repositories/postgres/user/postgres-create-user-repository";
import { PostgresShowUserPerEmailRepository } from "repositories/postgres/user/postgres-show-user-email-repository";
import { User } from "entities/User";

const BodySchema = z.object({
  email: z.string().email(),
  fullName: z.string(),
  password: z.string().min(8),
});
export class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, fullName, password } = BodySchema.parse(req.body);

      const user = new User({
        userEmail: email,
        userFullName: fullName,
        userPassword: password,
        userId: "",
      });

      const createUserRepository = new PostgresCreateUserRepository();
      const showUserPerEmailRepository =
        new PostgresShowUserPerEmailRepository();

      const createUser = new CreateUser(
        user,
        createUserRepository,
        showUserPerEmailRepository
      );

      await createUser.execute();

      return res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
}
