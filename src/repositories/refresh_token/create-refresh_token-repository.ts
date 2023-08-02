import { RefreshTokenSchema } from "models/refresh_tokens-schema";

export interface CreateRefreshTokenRepository {
  create({
    expiresIn,
    id,
    userId,
  }: RefreshTokenSchema): Promise<RefreshTokenSchema>;
}
