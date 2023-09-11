import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { UpdateUser } from "./update-user";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import { PostgresUpdateUserRepository } from "repositories/postgres/user/postgres-update-user-repository";

const BodySchema = z.object({
  email: z.string().email().optional(),
  oldPassword: z.string().optional(),
  newPassword: z.string().min(7).optional(),
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
          throw Error("newPasswordConfirmation is required to update password");
        }
        if (!oldPassword) {
          throw Error("oldPassword is required to update password");
        }
        if (newPasswordConfirmation !== newPassword) {
          throw Error("the password and newPasswordConfirmation not is macth");
        }
      }

      if (
        !email &&
        !newPassword &&
        !newPasswordConfirmation &&
        !oldPassword &&
        !fullName
      ) {
        throw Error("Missing data");
      }

      const showUserRepository = new PostgresShowUserPerUserIdRepository();
      const updateUserRepository = new PostgresUpdateUserRepository();
      const updateUser = new UpdateUser(
        showUserRepository,
        updateUserRepository
      );

      const {
        email: responseEmail,
        fullName: responseFullName,
        id: responseId,
      } = await updateUser.handle({
        userId,
        email,
        fullName,
        newPassword,
        newPasswordConfirmation,
        oldPassword,
      });

      return res.status(200).json({
        props: {
          email: responseEmail,
          fullName: responseFullName,
          id: responseId,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
