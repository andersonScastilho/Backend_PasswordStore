import { myEmitter } from "service/events/user-events";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
import AuthVerifyEmail from "service/auth-verifyEmail";

export class ValidateEmail {
  constructor(private showUserPerIdRepository: ShowUserPerUserIdRepository) {}
  async execute(token: string) {
    const auth = new AuthVerifyEmail();

    const userId = auth.validateVerifyEmail(token);

    const user = await this.showUserPerIdRepository.show(userId);

    if (!user) {
      return false;
    }

    myEmitter.emit("user/verifiedEmail-update", userId);

    return true;
  }
}
