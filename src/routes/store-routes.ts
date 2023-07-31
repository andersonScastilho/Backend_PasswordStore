import { Router } from "express";
import { CreateStorageController } from "use-cases/storage/create/create-storage-controller";

import Auth from "middlewares/auth";
import { IndexStorageController } from "use-cases/storage/index/index-storage-controller";

const createStorageController = new CreateStorageController();
const indexStorageController = new IndexStorageController();
const router = Router();

router.post("/storages", Auth, createStorageController.handle);
router.get("/storages", Auth, indexStorageController.handle);

export { router as storageRoutes };
