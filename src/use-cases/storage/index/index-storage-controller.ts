import { NextFunction, Request, Response } from "express";
import { PostgresIndexStorageRepository } from "repositories/postgres/storage/postgres-index-storage-repository";
import { IndexStorage } from "./index-storage";

export class IndexStorageController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    try {
      if (!userId) {
        return res.status(401).json({
          error: "Login required",
        });
      }

      const indexStorageRepository = new PostgresIndexStorageRepository();
      const indexStorage = new IndexStorage(indexStorageRepository);

      const storages = await indexStorage.execute(userId);

      return res.status(200).json({ storages });
    } catch (e) {
      next(e);
    }
  }
}
