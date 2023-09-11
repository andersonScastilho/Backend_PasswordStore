import { Request, Response, NextFunction } from "express";

import { CreateStorage } from "./create-storage";
import { PostgresStorageRepository } from "../../../repositories/postgres/storage/postgres-create-storage-repository";
import { z } from "zod";

const BodySchema = z.object({
  password: z.string(),
  account: z.string(),
  usageLocation: z.string(),
  link: z.string().optional(),
  description: z.string().optional(),
});

const ParamsSchema = z.object({
  userId: z.string(),
});
export class CreateStorageController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, account, usageLocation, link, description } =
        BodySchema.parse(req.body);
      const { userId } = ParamsSchema.parse(req.params);

      const storageRepository = new PostgresStorageRepository();
      const createStorage = new CreateStorage(storageRepository);

      const storage = await createStorage.execute({
        account,
        password,
        usageLocation,
        description,
        link,
        userId,
      });

      return res.status(200).json(storage);
    } catch (e) {
      next(e);
    }
  }
}
