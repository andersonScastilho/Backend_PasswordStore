import { DeleteRefreshTokenRepository } from "repositories/refresh_token/delete-refresh_token-repository";
export declare class PostgresDeleteRefreshTokenRepository implements DeleteRefreshTokenRepository {
    delete(userId: string): Promise<void>;
}
