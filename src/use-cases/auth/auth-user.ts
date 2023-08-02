import { User } from "entities/User";
import Auth from "provider/Auth";
import { CreateRefreshTokenRepository } from "repositories/refresh_token/create-refresh_token-repository";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
import dayjs from "dayjs";
import { v4 as uudiv4 } from "uuid";
import { DeleteRefreshTokenRepository } from "repositories/refresh_token/delete-refresh_token-repository";

interface LoginUserRequest {
  email: string;
  password: string;
}

export class AuthUser {
  constructor(
    private showUserPerEmailRepository: ShowUserPerEmailRepository,
    private createRefreshTokenRepository: CreateRefreshTokenRepository,
    private deleteRefreshTokenRepository: DeleteRefreshTokenRepository
  ) {}
  async execute({ email, password }: LoginUserRequest) {
    const user = await this.showUserPerEmailRepository.show(email);

    if (!user) {
      throw Error("User not found");
    }

    const instanceUser = new User({
      userEmail: user.email,
      userFullName: user.fullName,
      userId: user.id,
      userPassword: user.password_hash,
    });

    const auth = new Auth();

    await this.deleteRefreshTokenRepository.delete(user.id);

    const token = await auth.authentication(instanceUser, password);

    const uuid = uudiv4();
    const expiresIn = dayjs().add(7, "day").unix();

    const refreshToken = await this.createRefreshTokenRepository.create({
      expiresIn: expiresIn,
      id: uuid,
      userId: instanceUser.userId,
    });

    return { token, refreshToken };
  }
}
