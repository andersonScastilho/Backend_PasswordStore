import Auth from "../provider/Auth";
import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ errors: ["Login required"] });
    }

    const auth = new Auth();

    const id = auth.validAuth(authorization);

    req.params = { ...req.params, userId: id };
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Token expired or invalid" });
  }
};
