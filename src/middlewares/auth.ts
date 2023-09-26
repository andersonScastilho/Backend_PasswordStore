import { PostgresShowUserPerUserIdRepository } from "repositories/postgres/user/postgres-show-user-userId-repository";
import Auth from "../service/auth-login";
import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    const showUserPerUserIdRepository =
      new PostgresShowUserPerUserIdRepository();

    if (!authorization) {
      return res.status(401).json({ errors: ["Login required"] });
    }

    const auth = new Auth(showUserPerUserIdRepository);

    const id = await auth.validAuth(authorization);
    req.params = { ...req.params, userId: id };
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Token expired or invalid" });
  }
};
