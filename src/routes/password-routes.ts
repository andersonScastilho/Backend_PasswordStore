import { Router } from "express";
import { ShowStoragePasswordController } from "use-cases/storage/show-password/show-storage-password-controller";
import Auth from "../middlewares/auth";

const router = Router();
const showStoragePasswordController = new ShowStoragePasswordController();
router.post(
  "/passwords/storages/:storageId",
  Auth,
  showStoragePasswordController.handle
);

export { router as passwordRoutes };
