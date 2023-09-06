import { Router } from "express";
import VerifyEmailController from "use-cases/email/verify/verify-email-controller";

const router = Router();
const verifyEmailController = new VerifyEmailController();

router.get("/verify-email", verifyEmailController.handle);

export { router as verifyEmail };
