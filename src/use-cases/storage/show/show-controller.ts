import { Request, Response } from "express";
import { PostgresShowStorageRepository } from "repositories/postgres/storage/postgres-show-storage-repository";
import { ShowStorage } from "./show-storage";

export class ShowStorageController {
  async handle(req: Request, res: Response) {
    const { storageId, userId } = req.params;
    try {
      const storageRepository = new PostgresShowStorageRepository();
      const showStorage = new ShowStorage(storageRepository);
      const storage = await showStorage.execute(storageId, userId);

      return res.status(200).json({
        storage,
      });
    } catch (e) {
      return res.status(400).json({
        error: "Não foi possivel mostrar o storage",
      });
    }
  }
}
