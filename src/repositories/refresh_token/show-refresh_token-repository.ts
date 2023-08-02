import { RefreshTokenSchema } from "models/refresh_tokens-schema";

export interface ShowRefreshTokenRepository {
  show(refresh_token: string): Promise<RefreshTokenSchema | null>;
}
