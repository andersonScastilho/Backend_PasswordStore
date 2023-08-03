import { Router } from "express";
import Auth from "middlewares/auth";
import { CreateUserController } from "use-cases/user/create/create-user-controller";
import { ShowUserController } from "use-cases/user/show/show-user-controller";
import { UpdateUserController } from "use-cases/user/update/update-user-controller";

const router = Router();

const createUserController = new CreateUserController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();

router.post("/users", createUserController.handle);
router.get("/users", Auth, showUserController.handle);
router.put("/users", Auth, updateUserController.handle);

export { router as userRouter };
