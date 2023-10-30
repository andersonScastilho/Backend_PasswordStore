import jwt from "jsonwebtoken";

import { User } from "../entities/user/User";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
import { Unauthorized } from "helpers/classes/Unauthorized";
import { NotFound } from "helpers/classes/NotFound";

type JwtPayload = {
  id: string;
  email: string;
  type: string;
};

class Auth {
  constructor(
    private showUserPerUserIdRepository?: ShowUserPerUserIdRepository
  ) {}
  async validAuth(authorization: string) {
    const [, token] = authorization.split(" ");

    const tokenIsValid = jwt.verify(token, process.env.TOKEN_SECRET ?? "");

    if (!tokenIsValid) {
      throw new Unauthorized("Invalid token");
    }

    const { id, email, type } = jwt.verify(
      token,
      process.env.TOKEN_SECRET ?? ""
    ) as JwtPayload;

    const userPerId = await this.showUserPerUserIdRepository?.show(id);

    if (!userPerId) {
      throw new NotFound("User not found");
    }

    if (type !== "auth")
      if (email !== userPerId.email) {
        throw new Unauthorized("Invalid token");
      }

    return id;
  }

  async authentication(user: User, password: string) {
    const passwordIsValid = await user.comparePasswords(password);

    if (!passwordIsValid) {
      throw new Unauthorized("Invalid password");
    }

    const token = jwt.sign(
      { id: user.userId, email: user.userEmail, type: "auth" },
      process.env.TOKEN_SECRET ?? "",
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );

    return token;
  }

  async authenticationRefreshToken(userId: string, email: string) {
    const token = jwt.sign(
      { id: userId, email: email, type: "auth" },
      process.env.TOKEN_SECRET ?? "",
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );
    return token;
  }
}

export default Auth;
