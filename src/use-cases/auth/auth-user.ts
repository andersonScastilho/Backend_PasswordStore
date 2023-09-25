import { User } from "entities/User";
import Auth from "service/Auth";
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
    const userSchema = await this.showUserPerEmailRepository.show(email);

    if (!userSchema) {
      throw Error("User not found");
    }
    if (userSchema.verifiedEmail !== true) {
      throw Error("Unverified email");
    }

    const user = new User({
      userEmail: userSchema.email,
      userFullName: userSchema.fullName,
      userId: userSchema.id,
      userPassword: userSchema.password_hash,
      verifiedEmail: userSchema.verifiedEmail,
    });

    const auth = new Auth();

    await this.deleteRefreshTokenRepository.delete(userSchema.id);

    const token = await auth.authentication(user, password);

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
