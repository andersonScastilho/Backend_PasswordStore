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
    try {
      const { storageId, userId } = ParamsSchema.parse(req.params);

      const storageRepository = new PostgresShowStorageRepository();
      const showStorage = new ShowStorage(storageRepository);
      const storage = await showStorage.execute(storageId, userId);

      return res.status(200).json({
        message: "storage encontrado com sucesso",
        storage: {
          account: storage.account,
          usageLocation: storage.usageLocation,
          password: "",
          description: storage.description,
          link: storage.link,
          userId: storage.userId,
          storageId: storage.storageId,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
