import { RefreshTokenSchema } from "models/refresh_tokens-schema";
import { ShowRefreshTokenRepository } from "repositories/refresh_token/show-refresh_token-repository";
export declare class PostgresShowRefreshTokenRepository implements ShowRefreshTokenRepository {
    show(refresh_token: string): Promise<RefreshTokenSchema | null>;
}
