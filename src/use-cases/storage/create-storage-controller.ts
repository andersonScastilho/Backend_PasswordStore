import { Request, Response } from "express";

import { CreateStorage } from "./create-storage";
import { PostgresStorageRepository } from "../../repositories/postgres/postgres-storage-repository";

export class CreateStorageController {
  async handle(req: Request, res: Response) {
    const { password, account, usageLocation, link, description } = req.body;
    const { userId } = req.params;

    try {
      const storageRepository = new PostgresStorageRepository();
      const createStorage = new CreateStorage(storageRepository);

      const storagedPassword = await createStorage.execute({
        account,
        password,
        usageLocation,
        description,
        link,
        userId,
      });

      return res.status(200).json(storagedPassword);
    } catch (e) {
      return res.status(400).json({
        error: "F fuleco falecido",
      });
    }
  }
}
