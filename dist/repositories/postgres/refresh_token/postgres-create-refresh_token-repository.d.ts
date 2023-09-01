import { RefreshTokenSchema } from "models/refresh_tokens-schema";
import { CreateRefreshTokenRepository } from "repositories/refresh_token/create-refresh_token-repository";
export declare class PostgresCreateRefreshToken implements CreateRefreshTokenRepository {
    create({ expiresIn, id, userId, }: RefreshTokenSchema): Promise<RefreshTokenSchema>;
}
