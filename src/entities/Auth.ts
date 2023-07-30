import jwt from "jsonwebtoken";
import { User } from "./User";

class Auth {
  validAuth(token: string) {
    const tokenIsValid = jwt.verify(token, process.env.TOKEN_SECRET ?? "");

    if (!tokenIsValid) {
      throw Error("Invalid token");
    }

    return tokenIsValid;
  }

  authentication(user: User, password: string) {
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

    return token;
  }
}

export default new Auth();
