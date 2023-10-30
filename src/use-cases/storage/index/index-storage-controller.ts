import { NextFunction, Request, Response } from "express";
import { PostgresIndexStorageRepository } from "repositories/postgres/storage/postgres-index-storage-repository";
import { IndexStorage } from "./index-storage";
import { z } from "zod";
import { Unauthorized } from "helpers/classes/Unauthorized";

const ParamsSchema = z.object({
  userId: z.string(),
});
export class IndexStorageController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = ParamsSchema.parse(req.params);

      if (!userId) {
        throw new Unauthorized("Login required");
      }

      const indexStorageRepository = new PostgresIndexStorageRepository();
      const indexStorageService = new IndexStorage(indexStorageRepository);

      const storages = await indexStorageService.execute(userId);

      return res.status(200).json({ storages });
    } catch (e) {
      next(e);
    }
  }
}
