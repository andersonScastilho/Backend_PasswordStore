import { NextFunction, Request, Response } from "express";
import { PostgresShowStorageRepository } from "repositories/postgres/storage/postgres-show-storage-repository";
import { ShowStoragePassword } from "./show-storage-password";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import { z } from "zod";

const BodySchema = z.object({
  password: z.string(),
});

const ParamsSchema = z.object({
  storageId: z.string(),
  userId: z.string(),
});

export class ShowStoragePasswordController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = BodySchema.parse(req.body);

      const { storageId, userId } = ParamsSchema.parse(req.params);
      if (!password) {
        return res.status(400).json({
          error: "Missing data",
        });
      }
      const showStorageRepository = new PostgresShowStorageRepository();
      const showUserPerUserIdRepository =
        new PostgresShowUserPerUserIdRepository();

      const showStoragePassword = new ShowStoragePassword(
        showStorageRepository,
        showUserPerUserIdRepository
      );

      const descryptedPassword = await showStoragePassword.execute(
        storageId,
        userId,
        password
      );

      return res.status(200).json({ descryptedPassword });
    } catch (e) {
      next(e);
    }
  }
}
