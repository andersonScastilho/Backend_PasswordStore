import { Request, Response, Router } from "express";
import { InMemoryUserRepository } from "repositories/in-memory/in-memory-users-repository";
import { CreateUser } from "use-cases/create-user";

export const router = Router();

router.get("/users", (req, res) => {
  return res.status(200).json({
    ok: true,
  });
});

router.post("/users", async (req: Request, res: Response) => {
  const { email, fullName, password } = req.body;
  try {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    const user = await createUser.execute({
      userEmail: email,
      userFullName: fullName,
      userPassword: password,
    });

    return res
      .status(200)
      .json({ email: user.userEmail, fullName: user.userFullName });
  } catch (e) {
    return res.status(400).json({
      message: "Não foi possivel criar o usuario",
    });
  }
});
