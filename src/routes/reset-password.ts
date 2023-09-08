import { Router } from "express";
import { ResetPasswordController } from "use-cases/user/reset-password/reset-password-controller";
const router = Router();
const resetPasswordController = new ResetPasswordController();
router.post("/reset-password", resetPasswordController.handle);

export { router as resetPassword };
