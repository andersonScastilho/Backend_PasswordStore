import dayjs from "dayjs";
import Auth from "../../service/auth-login";
import { ShowRefreshTokenRepository } from "repositories/refresh_token/show-refresh_token-repository";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";

export class RefreshToken {
  constructor(
    private _auth: Auth,
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

    if (user.verifiedEmail !== true) {
      throw Error("Unverified email");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    if (refreshTokenExpired) {
      throw Error("Refresh_token expired");
    }

    const token = await this._auth.authenticationRefreshToken(
      refreshToken.userId,
      user.email
    );

    return token;
  }
}
