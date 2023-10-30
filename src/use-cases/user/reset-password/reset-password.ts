import { User } from "entities/user/User";
import { myEmitter } from "service/events/user-events";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
import AuthForgotPassword from "service/auth-forgotPassword";
import { NotFound } from "helpers/classes/NotFound";
import { Unauthorized } from "helpers/classes/Unauthorized";

export class ResetPassword {
  constructor(
    private auth: AuthForgotPassword,
    private showUserPerIdRepository: ShowUserPerUserIdRepository
  ) {}
  async execute(token: string, newPassword: string) {
    const fullFieldToken = `Bearer ${token}`;
    const userId = this.auth.validateForgotPassword(fullFieldToken);

    if (!userId) {
      throw new Unauthorized("Invalid token");
    }
    const userSchema = await this.showUserPerIdRepository.show(userId);

    if (!userSchema) {
      throw new NotFound("User not found");
    }

    const user = new User({
      email: userSchema.email,
      fullName: userSchema.fullName,
      userId: userSchema.id,
      password: userSchema.password_hash,
      verifiedEmail: userSchema.verifiedEmail,
    });

    await user.resetPassword(newPassword);

    myEmitter.emit("user/reset-password", user.userPassword, userSchema.id);

    return;
  }
}
