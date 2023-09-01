import { CreateRefreshTokenRepository } from "repositories/refresh_token/create-refresh_token-repository";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
import { DeleteRefreshTokenRepository } from "repositories/refresh_token/delete-refresh_token-repository";
interface LoginUserRequest {
    email: string;
    password: string;
}
export declare class AuthUser {
    private showUserPerEmailRepository;
    private createRefreshTokenRepository;
    private deleteRefreshTokenRepository;
    constructor(showUserPerEmailRepository: ShowUserPerEmailRepository, createRefreshTokenRepository: CreateRefreshTokenRepository, deleteRefreshTokenRepository: DeleteRefreshTokenRepository);
    execute({ email, password }: LoginUserRequest): Promise<{
        token: string;
        refreshToken: import("../../models/refresh_tokens-schema").RefreshTokenSchema;
    }>;
}
export {};
