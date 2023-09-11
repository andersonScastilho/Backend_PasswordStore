import { Router } from "express";
import ValidateEmailController from "../use-cases/user/validate-email/validate-email-controller";

const router = Router();
const validateEmailController = new ValidateEmailController();

router.post("/validate-email", validateEmailController.handle);

export { router as validateEmail };
