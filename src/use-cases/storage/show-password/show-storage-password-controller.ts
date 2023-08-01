import { Request, Response } from "express";
import { PostgresShowStorageRepository } from "repositories/postgres/storage/postgres-show-storage-repository";
import { ShowStoragePassword } from "./show-storage-password";
import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";

export class ShowStoragePasswordController {
  async handle(req: Request, res: Response) {
    const { password } = req.body;
    const { storageId, userId } = req.params;
    try {
      if (!password) {
        return res.status(400).json({
          error: "Missing data",
        });
      }
      const showStorageRepository = new PostgresShowStorageRepository();
      const showUserPerUserIdRepository =
        new PostgresShowUserPerUserIdRepository();

      const showStoragePassword = new ShowStoragePassword(
        showStorageRepository,
        showUserPerUserIdRepository
      );

      const descryptedPassword = await showStoragePassword.execute(
        storageId,
        userId,
        password
      );

      return res.status(200).json({ descryptedPassword });
    } catch (e) {
      return res.status(400).json({
        error: "Não foi possivel mostrar a senha",
      });
    }
  }
}
