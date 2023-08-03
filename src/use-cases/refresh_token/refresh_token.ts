import dayjs from "dayjs";
import Auth from "provider/Auth";
import { ShowRefreshTokenRepository } from "repositories/refresh_token/show-refresh_token-repository";

export class RefreshToken {
  constructor(private showRefreshTokenRepository: ShowRefreshTokenRepository) {}
  async execute(refresh_token: string) {
    const refreshToken = await this.showRefreshTokenRepository.show(
      refresh_token
    );

    const auth = new Auth();

    if (!refreshToken) {
      throw Error("Refresh token invalid");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    if (refreshTokenExpired) {
      throw Error("Refresh_token expired");
    }

    const token = await auth.authenticationProvider(refreshToken.userId);

    return token;
  }
}
