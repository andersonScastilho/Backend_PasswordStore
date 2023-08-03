import { NextFunction, Request, Response } from "express";
import { PostgresShowStorageRepository } from "repositories/postgres/storage/postgres-show-storage-repository";
import { ShowStorage } from "./show-storage";

export class ShowStorageController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { storageId, userId } = req.params;
    try {
      const storageRepository = new PostgresShowStorageRepository();
      const showStorage = new ShowStorage(storageRepository);
      const storage = await showStorage.execute(storageId, userId);

      return res.status(200).json({
        id: storage.id,
        account: storage.account,
        password: "",
        usageLocation: storage.usageLocation,
        link: storage.link,
        description: storage.description,
      });
    } catch (e) {
      next(e);
    }
  }
}
