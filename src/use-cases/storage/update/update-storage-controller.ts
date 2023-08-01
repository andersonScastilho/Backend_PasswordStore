import { Request, Response } from "express";
import { PostgresShowStorageRepository } from "repositories/postgres/storage/postgres-show-storage-repository";
import { PostgresUpdateStorageRepository } from "repositories/postgres/storage/postgres-update-storage-repository";
import { UpdateStorage } from "./update-storage";

export class UpdateStorageController {
  async handle(req: Request, res: Response) {
    const { account, usageLocation, description, link, password } = req.body;
    const { userId, storageId } = req.params;

    try {
      if (!account && !usageLocation && !description && !link) {
        return res.status(400).json({
          error: "Missing data",
        });
      }

      const updateStorageRepository = new PostgresUpdateStorageRepository();
      const showStorageRepository = new PostgresShowStorageRepository();

      const updateStorage = new UpdateStorage(
        updateStorageRepository,
        showStorageRepository
      );

      const storage = await updateStorage.execute({
        account,
        storageId,
        userId,
        description,
        link,
        usageLocation,
        password,
      });

      return res.status(200).json({ storage });
    } catch (e) {
      return res.status(400).json({
        error: "Não foi possivel atualizar o storage",
      });
    }
  }
}
