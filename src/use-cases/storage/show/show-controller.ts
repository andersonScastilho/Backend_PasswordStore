import { NextFunction, Request, Response } from "express";
import { PostgresShowStorageRepository } from "repositories/postgres/storage/postgres-show-storage-repository";
import { ShowStorage } from "./show-storage";
import { z } from "zod";

const ParamsSchema = z.object({
  storageId: z.string(),
  userId: z.string(),
});
export class ShowStorageController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { storageId, userId } = ParamsSchema.parse(req.params);

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
