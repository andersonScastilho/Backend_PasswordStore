import { Router } from "express";
import { CreateStorageController } from "use-cases/storage/create/create-storage-controller";

import Auth from "middlewares/auth";
import { IndexStorageController } from "use-cases/storage/index/index-storage-controller";
import { ShowStorageController } from "use-cases/storage/show/show-controller";
import { UpdateStorageController } from "use-cases/storage/update/update-storage-controller";
import { DeleteStorageController } from "use-cases/storage/delete/delete-storage-controller";

const createStorageController = new CreateStorageController();
const indexStorageController = new IndexStorageController();
const showStorageController = new ShowStorageController();
const updateStorageController = new UpdateStorageController();
const deleteStorageController = new DeleteStorageController();
const router = Router();

router.post("/storages", Auth, createStorageController.handle);
router.get("/storages", Auth, indexStorageController.handle);
router.get("/storages/:storageId", Auth, showStorageController.handle);
router.put("/storages/:storageId", Auth, updateStorageController.handle);
router.delete("/storages/:storageId", Auth, deleteStorageController.handle);

export { router as storageRoutes };
