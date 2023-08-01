import { Request, Response } from "express";

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
    } catch (e) {
      return res.status(400).json({
        error: "Não foi possivel mostrar a senha",
      });
    }
  }
}
