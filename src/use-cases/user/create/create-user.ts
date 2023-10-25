import { User } from "entities/user/User";
import { BadRequest } from "helpers/classes/BadRequest";
import { CreateUserRepository } from "repositories/user/create-user-repository";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";

export class CreateUser {
  constructor(
    private _user: User,
    private _createUserRepository: CreateUserRepository,
    private _showUserperEmailRepository: ShowUserPerEmailRepository
  ) {}
  async execute(): Promise<User> {
    const userExist = await this._showUserperEmailRepository.show(
      this._user.userEmail
    );

    if (userExist) {
      throw new BadRequest("Email in use.");
    }

    const user = await this._user.createUser();

    await this._createUserRepository.create(user);

    return user;
  }
}
