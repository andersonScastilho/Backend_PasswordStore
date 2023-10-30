import { Request, Response, NextFunction } from "express";

import { CreateStorage } from "./create-storage";
import { PostgresStorageRepository } from "../../../repositories/postgres/storage/postgres-create-storage-repository";
import { z } from "zod";
import { Storage } from "entities/storage/Storage";

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

      const storage = new Storage({
        account,
        password,
        usageLocation,
        description: description || null,
        link: link || null,
        userId,
        storageId: "",
      });

      const storageRepository = new PostgresStorageRepository();
      const createStorageService = new CreateStorage(
        storage,
        storageRepository
      );

      await createStorageService.execute();

      return res.status(200).json({
        storage: {
          props: {
            account: storage.account,
            usageLocation: storage.usageLocation,
            password: "",
            description: storage.description,
            link: storage.link,
            userId: storage.userId,
            storageId: storage.storageId,
          },
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
