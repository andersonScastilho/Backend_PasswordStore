import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { UpdateUser } from "./update-user";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import { PostgresUpdateUserRepository } from "repositories/postgres/user/postgres-update-user-repository";
import { BadRequest } from "helpers/classes/BadRequest";
import { User } from "entities/user/User";

const BodySchema = z.object({
  email: z.string().email().optional(),
  oldPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(7)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .optional(),
  newPasswordConfirmation: z.string().min(7).optional(),
  fullName: z.string().optional(),
});
const ParamsSchema = z.object({
  userId: z.string(),
});

export class UpdateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        newPassword,
        newPasswordConfirmation,
        oldPassword,
        fullName,
      } = BodySchema.parse(req.body);
      const { userId } = ParamsSchema.parse(req.params);

      if (newPassword) {
        if (!newPasswordConfirmation) {
          throw new BadRequest(
            "newPasswordConfirmation is required to update password"
          );
        }
        if (!oldPassword) {
          throw new BadRequest("oldPassword is required to update password");
        }
        if (newPasswordConfirmation !== newPassword) {
          throw new BadRequest(
            "the password and newPasswordConfirmation not is macth"
          );
        }
      }

      const showUserRepository = new PostgresShowUserPerUserIdRepository();
      const showUserPerEmailRepository =
        new PostgresShowUserPerUserIdRepository();
      const updateUserRepository = new PostgresUpdateUserRepository();

      const user = new User({
        email: email || "",
        fullName: fullName || "",
        password: "",
        userId: userId,
        verifiedEmail: false,
      });

      const updateUserService = new UpdateUser(
        user,
        showUserRepository,
        showUserPerEmailRepository,
        updateUserRepository
      );

      const updatedUser = await updateUserService.execute({
        newPassword,
        newPasswordConfirmation,
        oldPassword,
      });

      res.status(200).json({
        message: "Usuario atualizado com sucesso",
        user: {
          email: updatedUser.email,
          fullName: updatedUser.fullName,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
// const {
//   email: responseEmail,
//   fullName: responseFullName,
//   id: responseId,
// } = await updateUser.execute({
//   userId,
//   email,
//   fullName,
//   newPassword,
//   newPasswordConfirmation,
//   oldPassword,
// });

// return res.status(200).json({
//   props: {
//     email: responseEmail,
//     fullName: responseFullName,
//     id: responseId,
//   },
// });
