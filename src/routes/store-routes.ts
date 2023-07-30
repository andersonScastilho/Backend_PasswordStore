import { Router } from "express";
import { CreateStorageController } from "use-cases/storage/create-storage-controller";

import Auth from "middlewares/auth";
const createStorageController = new CreateStorageController();
const router = Router();

router.post("/storages", Auth, createStorageController.handle);

export { router as storageRoutes };
