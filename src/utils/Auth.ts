import jwt from "jsonwebtoken";

import { User } from "../entities/User";
import { GenerateRefreshToken } from "provider/GenerateRefreshToken";

type JwtPayload = {
  id: string;
};
class Auth {
  validAuth(authorization: string) {
    const [, token] = authorization.split(" ");

    const tokenIsValid = jwt.verify(token, process.env.TOKEN_SECRET ?? "");

    if (!tokenIsValid) {
      throw Error("Invalid token");
    }

    const { id } = jwt.verify(
      token,
      process.env.TOKEN_SECRET ?? ""
    ) as JwtPayload;

    return id;
  }

  async authentication(user: User, password: string) {
    const passwordIsValid = user.comparePasswords(password);

    if (!passwordIsValid) {
      throw Error("Invalid password");
    }

    const token = jwt.sign(
      { id: user.userId },
      process.env.TOKEN_SECRET ?? "",
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );
    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(user.userId);

    return { token, refreshToken };
  }
}

export default new Auth();
