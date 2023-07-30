import { Router } from "express";
import { AuthController } from "use-cases/auth/auth-controller";

const router = Router();
const authController = new AuthController();

router.post("/auth", authController.handle);

export { router as auhRoutes };
