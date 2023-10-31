import { NextFunction, Request, Response } from "express";
import { PostgresDeleteStorageRepository } from "repositories/postgres/storage/postgres-delete-storage-repository";
import { PostgresShowStorageRepository } from "repositories/postgres/storage/postgres-show-storage-repository";
import { DeleteStorage } from "./delete-storage";
import { z } from "zod";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";

const ParamsSchema = z.object({
  userId: z.string(),
  storageId: z.string(),
});
export class DeleteStorageController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, storageId } = ParamsSchema.parse(req.params);

      const deleteStorageRepository = new PostgresDeleteStorageRepository();
      const showStorageRepository = new PostgresShowStorageRepository();

      const deleteStorage = new DeleteStorage(
        deleteStorageRepository,
        showStorageRepository
      );

      await deleteStorage.execute(storageId, userId);

      return res.status(200).json({ message: "Storage deletado com sucesso" });
    } catch (e) {
      next(e);
    }
  }
}
