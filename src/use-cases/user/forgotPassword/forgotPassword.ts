import { User } from "entities/User";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

export class ForgotPassword {
  constructor(private showUserPerEmail: ShowUserPerEmailRepository) {}
  async execute(email: string) {
    const user = await this.showUserPerEmail.show(email);

    if (!user) {
      throw Error("User not found");
    }

    const instanceUser = new User({
      userEmail: user.email,
      userFullName: user.fullName,
      userId: user.id,
      userPassword: user.password_hash,
    });

    await instanceUser.sendEmailToForgotPassword();

    return;
  }
}
