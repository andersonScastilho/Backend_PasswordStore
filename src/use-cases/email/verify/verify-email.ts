import { myEmitter } from "events/update-user-verifyEmaill";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
import Auth from "service/Auth";

export class VerifyEmail {
  constructor(private showUserPerIdRepository: ShowUserPerUserIdRepository) {}
  async execute(token: string) {
    const auth = new Auth(this.showUserPerIdRepository);

    const userId = await auth.validAuth(token);
    const user = await this.showUserPerIdRepository.show(userId);
    if (!user) {
      return false;
    }

    myEmitter.emit("user/verifiedEmail-update", userId);

    return true;
  }
}
