import dayjs from "dayjs";
import Auth from "service/Auth";
import { ShowRefreshTokenRepository } from "repositories/refresh_token/show-refresh_token-repository";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";

export class RefreshToken {
  constructor(
    private showRefreshTokenRepository: ShowRefreshTokenRepository,
    private showUserPerUserIdRepository: ShowUserPerUserIdRepository
  ) {}
  async execute(refresh_token: string) {
    const refreshToken = await this.showRefreshTokenRepository.show(
      refresh_token
    );

    if (!refreshToken) {
      throw Error("Refresh token invalid");
    }

    const user = await this.showUserPerUserIdRepository.show(
      refreshToken.userId
    );

    if (!user) {
      throw Error("User not found");
    }

    const auth = new Auth();

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    if (refreshTokenExpired) {
      throw Error("Refresh_token expired");
    }

    const token = await auth.authenticationProvider(
      refreshToken.userId,
      user.email
    );

    return token;
  }
}
