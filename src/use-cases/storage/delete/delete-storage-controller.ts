import { Request, Response } from "express";
import { PostgresDeleteStorageRepository } from "repositories/postgres/storage/postgres-delete-storage-repository";
import { PostgresShowStorageRepository } from "repositories/postgres/storage/postgres-show-storage-repository";
import { DeleteStorage } from "./delete-storage";

export class DeleteStorageController {
  async handle(req: Request, res: Response) {
    const { userId, storageId } = req.params;

    try {
      const deleteStorageRepository = new PostgresDeleteStorageRepository();
      const showStorageRepository = new PostgresShowStorageRepository();

      const deleteStorage = new DeleteStorage(
        deleteStorageRepository,
        showStorageRepository
      );

      await deleteStorage.execute(storageId, userId);

      return res.status(200).json({});
    } catch (e) {
      return res.status(400).json({
        error: "Não foi possivel deletar este storage",
      });
    }
  }
}