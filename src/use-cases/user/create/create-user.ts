import { User } from "entities/User";
import { CreateUserRepository } from "repositories/user/create-user-repository";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

export class CreateUser {
  constructor(
    private _user: User,
    private _createUserRepository: CreateUserRepository,
    private _showUserperEmailRepository: ShowUserPerEmailRepository
  ) {}
  async execute(): Promise<void> {
    const userExist = await this._showUserperEmailRepository.show(
      this._user.userEmail
    );

    if (userExist) {
      throw Error("Email in use");
    }

    await this._user.createUser();

    await this._createUserRepository.create(this._user);

    return;
  }
}
