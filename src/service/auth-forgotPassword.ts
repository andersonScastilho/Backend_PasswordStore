import { Unauthorized } from "helpers/classes/Unauthorized";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
  email: string;
  type: string;
};

class AuthForgotPassword {
  validateForgotPassword(authorization: string) {
    const [, token] = authorization.split(" ");

    const tokenIsValid = jwt.verify(
      token,
      process.env.TOKEN_SECRET_FORGOT_PASSWORD ?? ""
    );

    if (!tokenIsValid) {
      throw new Unauthorized("Invalid token");
    }

    const { id, type } = jwt.verify(
      token,
      process.env.TOKEN_SECRET_FORGOT_PASSWORD ?? ""
    ) as JwtPayload;

    if (type !== "forgot-password") {
      throw new Unauthorized("Invalid token");
    }

    return id;
  }

  authForgotPassword(userId: string, userEmail: string) {
    const token = jwt.sign(
      { id: userId, email: userEmail, type: "forgot-password" },
      process.env.TOKEN_SECRET_FORGOT_PASSWORD ?? "",
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );
    return token;
  }
}
export default AuthForgotPassword;
