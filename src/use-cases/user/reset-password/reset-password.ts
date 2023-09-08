import { User } from "entities/User";
import { myEmitter } from "events/user-events";
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
    const user = await this.showUserPerIdRepository.show(userId);

    if (!user) {
      throw Error("User not found");
    }

    const instanceUser = new User({
      userEmail: user.email,
      userFullName: user.fullName,
      userId: user.id,
      userPassword: user.password_hash,
    });

    const newPasswordHash = await instanceUser.encryptedPassword(newPassword);

    myEmitter.emit("user/reset-password", newPasswordHash, user.id);

    return;
  }
}
