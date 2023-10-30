import { myEmitter } from "service/events/user-events";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
import { NotFound } from "helpers/classes/NotFound";

export class ForgotPassword {
  constructor(private showUserPerEmail: ShowUserPerEmailRepository) {}
  async execute(email: string) {
    const user = await this.showUserPerEmail.show(email);

    if (!user) {
      throw new NotFound("User not found");
    }

    myEmitter.emit("user/sendEmail-forgotPassword", user.id, user.email);

    return;
  }
}
