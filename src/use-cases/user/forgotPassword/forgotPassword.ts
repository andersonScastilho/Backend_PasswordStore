import { myEmitter } from "events/user-events";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

export class ForgotPassword {
  constructor(private showUserPerEmail: ShowUserPerEmailRepository) {}
  async execute(email: string) {
    const user = await this.showUserPerEmail.show(email);

    if (!user) {
      throw Error("User not found");
    }
    myEmitter.emit("user/sendEmail-forgotPassword", user.id, user.email);

    return;
  }
}
