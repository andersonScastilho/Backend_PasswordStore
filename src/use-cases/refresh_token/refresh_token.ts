import dayjs from "dayjs";
import Auth from "../../service/auth-login";
import { ShowRefreshTokenRepository } from "repositories/refresh_token/show-refresh_token-repository";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
import { NotFound } from "helpers/classes/NotFound";
import { Unauthorized } from "helpers/classes/Unauthorized";

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
      throw new Unauthorized("Refresh token invalid");
    }

    const user = await this.showUserPerUserIdRepository.show(
      refreshToken.userId
    );

    if (!user) {
      throw new NotFound("User not found");
    }

    if (user.verifiedEmail !== true) {
      throw new Unauthorized("Unverified email");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    if (refreshTokenExpired) {
      throw new Unauthorized("Refresh_token expired");
    }

    const token = await this._auth.authenticationRefreshToken(
      refreshToken.userId,
      user.email
    );

    return token;
  }
}
