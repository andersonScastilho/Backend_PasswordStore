import { Router } from "express";
import VerifyEmailController from "../use-cases/user/verify-email/verify-email.controller";

const router = Router();

const verifyEmailController = new VerifyEmailController();

router.post("/verify-email", verifyEmailController.handle);

export { router as verifyEmail };
