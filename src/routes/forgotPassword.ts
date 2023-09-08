import { Router } from "express";
import { ForgotPasswordController } from "use-cases/user/forgotPassword/forgotPassword-controller";

const router = Router();
const forgotPasswordController = new ForgotPasswordController();

router.post("/forgot-password", forgotPasswordController.handle);

export { router as forgotPassword };
