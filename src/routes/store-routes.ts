import { Router } from "express";
import { CreateStorageController } from "use-cases/storage/create/create-storage-controller";

import Auth from "middlewares/auth";
import { IndexStorageController } from "use-cases/storage/index/index-storage-controller";
import { ShowStorageController } from "use-cases/storage/show/show-controller";
import { UpdateStorageController } from "use-cases/storage/update/update-storage-controller";

const createStorageController = new CreateStorageController();
const indexStorageController = new IndexStorageController();
const showStorageController = new ShowStorageController();
const updateStorageController = new UpdateStorageController();

const router = Router();

router.post("/storages", Auth, createStorageController.handle);
router.get("/storages", Auth, indexStorageController.handle);
router.get("/storages/:storageId", Auth, showStorageController.handle);
router.put("/storages/:storageId", Auth, updateStorageController.handle);

export { router as storageRoutes };
