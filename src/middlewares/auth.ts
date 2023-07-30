import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ["Login required"] });
  }

  const [, token] = authorization.split(" ");

  try {
    const { id } = jwt.verify(
      token,
      process.env.TOKEN_SECRET ?? ""
    ) as JwtPayload;

    req.params = { userId: id };
    return next();
  } catch (e) {
    return res.status(401).json({ errors: ["Token expired or invalid"] });
  }
};
