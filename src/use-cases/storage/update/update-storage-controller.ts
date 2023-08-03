import { NextFunction, Request, Response } from "express";
import { PostgresShowStorageRepository } from "repositories/postgres/storage/postgres-show-storage-repository";
import { PostgresUpdateStorageRepository } from "repositories/postgres/storage/postgres-update-storage-repository";
import { UpdateStorage } from "./update-storage";
import { z } from "zod";

const BodySchema = z.object({
  account: z.string(),
  usageLocation: z.string(),
  description: z.string(),
  link: z.string(),
  password: z.string(),
});

const ParamsSchema = z.object({
  userId: z.string(),
  storageId: z.string(),
});
export class UpdateStorageController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { account, usageLocation, description, link, password } =
      BodySchema.parse(req.body);

    const { userId, storageId } = ParamsSchema.parse(req.params);

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
      next(e);
    }
  }
}
