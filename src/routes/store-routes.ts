import { Request, Response, Router } from "express";
import { InMemoryStorageRepository } from "repositories/in-memory/in-memory-storage-repository";
import { CreateStorage } from "use-cases/storage/create-storage";

const router = Router();

router.post("/storages", async (req: Request, res: Response) => {
  const { password, account, usageLocation, link, description } = req.body;

  try {
    const storageRepository = new InMemoryStorageRepository();
    const createStorage = new CreateStorage(storageRepository);

    const storagedPassword = await createStorage.execute({
      account,
      password,
      usageLocation,
      description,
      link,
    });

    return res.status(200).json(storagedPassword);
  } catch (e) {
    return res.status(400).json({
      error: "F fuleco falecido",
    });
  }
});

export { router as storageRoutes };
