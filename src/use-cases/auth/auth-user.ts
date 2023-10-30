import { User } from "entities/user/User";
import { CreateRefreshTokenRepository } from "repositories/refresh_token/create-refresh_token-repository";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
import dayjs from "dayjs";
import { v4 as uudiv4 } from "uuid";
import { DeleteRefreshTokenRepository } from "repositories/refresh_token/delete-refresh_token-repository";
import Auth from "service/auth-login";

interface LoginUserRequest {
  email: string;
  password: string;
}

export class AuthUser {
  constructor(
    private auth: Auth,
    private showUserPerEmailRepository: ShowUserPerEmailRepository,
    private createRefreshTokenRepository: CreateRefreshTokenRepository,
    private deleteRefreshTokenRepository: DeleteRefreshTokenRepository
  ) {}
  async execute({ email, password }: LoginUserRequest) {
    const userSchema = await this.showUserPerEmailRepository.show(email);

    if (!userSchema) {
      throw Error("User not found");
    }
    if (userSchema.verifiedEmail !== true) {
      throw Error("Unverified email");
    }

    const user = new User({
      email: userSchema.email,
      fullName: userSchema.fullName,
      userId: userSchema.id,
      password: userSchema.password_hash,
      verifiedEmail: userSchema.verifiedEmail,
    });

    await this.deleteRefreshTokenRepository.delete(userSchema.id);

    const token = await this.auth.authentication(user, password);

    const uuid = uudiv4();
    const expiresIn = dayjs().add(7, "days").unix();

    const refreshToken = await this.createRefreshTokenRepository.create({
      expiresIn: expiresIn,
      id: uuid,
      userId: user.userId,
    });

    return { token, refreshToken };
  }
}
