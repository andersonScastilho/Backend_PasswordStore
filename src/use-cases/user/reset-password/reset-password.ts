import { User } from "entities/User";
import { myEmitter } from "service/events/user-events";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
import Auth from "service/Auth";

export class ResetPassword {
  constructor(private showUserPerIdRepository: ShowUserPerUserIdRepository) {}
  async execute(token: string, newPassword: string) {
    const auth = new Auth(this.showUserPerIdRepository);
    const fullFieldToken = `Bearer ${token}`;
    const userId = await auth.validAuth(fullFieldToken);

    if (!userId) {
      throw Error("Invalid token");
    }
    const userSchema = await this.showUserPerIdRepository.show(userId);

    if (!userSchema) {
      throw Error("User not found");
    }

    const user = new User({
      userEmail: userSchema.email,
      userFullName: userSchema.fullName,
      userId: userSchema.id,
      userPassword: userSchema.password_hash,
      verifiedEmail: userSchema.verifiedEmail,
    });

    await user.resetPassword(newPassword);

    myEmitter.emit("user/reset-password", user.userPassword, userSchema.id);

    return;
  }
}
