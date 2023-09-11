import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { CreateUser } from "./create-user";
import { PostgresCreateUserRepository } from "repositories/postgres/user/postgres-create-user-repository";
import { PostgresShowUserPerEmailRepository } from "repositories/postgres/user/postgres-show-user-email-repository";

const BodySchema = z.object({
  email: z.string().email(),
  fullName: z.string(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});
export class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, fullName, password } = BodySchema.parse(req.body);

      const createUserRepository = new PostgresCreateUserRepository();
      const showUserPerEmailRepository =
        new PostgresShowUserPerEmailRepository();

      const createUser = new CreateUser(
        createUserRepository,
        showUserPerEmailRepository
      );

      const user = await createUser.execute({
        userEmail: email,
        userFullName: fullName,
        userPassword: password,
      });

      return res.status(200).json({
        props: {
          email: user.userEmail,
          fullName: user.userFullName,
          id: user.userId,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
