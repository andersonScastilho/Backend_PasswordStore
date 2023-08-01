import { Router } from "express";
import Auth from "middlewares/auth";
import { CreateUserController } from "use-cases/user/create/create-user-controller";
import { ShowUserController } from "use-cases/user/show/show-user-controller";

const router = Router();

const createUserController = new CreateUserController();
const showUserRepository = new ShowUserController();

router.post("/users", createUserController.handle);
router.get("/users", Auth, showUserRepository.handle);

export { router as userRouter };
