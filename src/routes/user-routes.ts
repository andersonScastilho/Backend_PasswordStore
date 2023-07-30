import { Router } from "express";
import { CreateUserController } from "use-cases/user/create/create-user-controller";

const router = Router();

const createUserController = new CreateUserController();

router.post("/users", createUserController.handle);

export { router as userRouter };
