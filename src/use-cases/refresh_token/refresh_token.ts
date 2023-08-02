import dayjs from "dayjs";
import Auth from "provider/Auth";
import { CreateRefreshTokenRepository } from "repositories/refresh_token/create-refresh_token-repository";
import { DeleteRefreshTokenRepository } from "repositories/refresh_token/delete-refresh_token-repository";
import { ShowRefreshTokenRepository } from "repositories/refresh_token/show-refresh_token-repository";
import { v4 as uudiv4 } from "uuid";

export class RefreshToken {
  constructor(
    private showRefreshTokenRepository: ShowRefreshTokenRepository,
    private createRefreshTokenRepository: CreateRefreshTokenRepository,
    private deleteRefreshTokenRepository: DeleteRefreshTokenRepository
  ) {}
  async execute(refresh_token: string) {
    const refreshToken = await this.showRefreshTokenRepository.show(
      refresh_token
    );

    const auth = new Auth();

    if (!refreshToken) {
      throw Error("Refresh token invalid");
    }

    const token = await auth.authenticationProvider(refreshToken.userId);

    const uuid = uudiv4();
    const expiresIn = dayjs().add(15, "second").unix();

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    if (refreshTokenExpired) {
      await this.deleteRefreshTokenRepository.delete(refreshToken.userId);

      const newRefreshToken = await this.createRefreshTokenRepository.create({
        expiresIn: expiresIn,
        userId: refreshToken.userId,
        id: uuid,
      });

      return { token, refresh_token: newRefreshToken };
    }

    return token;
  }
}
