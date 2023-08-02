import { Router } from "express";
import Auth from "../middlewares/auth";
import { RefreshTokenController } from "use-cases/refresh_token/refresh_token-controller";

const router = Router();
const refreshTokenController = new RefreshTokenController();

router.post("/refresh-token", refreshTokenController.handle);

export { router as refreshTokenRoutes };
