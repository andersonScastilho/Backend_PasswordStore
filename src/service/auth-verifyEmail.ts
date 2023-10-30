import { Unauthorized } from "helpers/classes/Unauthorized";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
  email: string;
  type: string;
};

class AuthVerifyEmail {
  validateVerifyEmail(authorization: string) {
    const [, token] = authorization.split(" ");

    const tokenIsValid = jwt.verify(
      token,
      process.env.TOKEN_SECRET_VERIFY_EMAIL ?? ""
    );
    if (!tokenIsValid) {
      throw new Unauthorized("Invalid token");
    }

    const { id, type } = jwt.verify(
      token,
      process.env.TOKEN_SECRET_VERIFY_EMAIL ?? ""
    ) as JwtPayload;

    if (type !== "verifyEmail") {
      throw new Unauthorized("Invalid token");
    }

    return id;
  }

  authVerifyEmail(userId: string, userEmail: string) {
    const token = jwt.sign(
      { id: userId, email: userEmail, type: "verifyEmail" },
      process.env.TOKEN_SECRET_VERIFY_EMAIL ?? "",
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );
    return token;
  }
}
export default AuthVerifyEmail;
