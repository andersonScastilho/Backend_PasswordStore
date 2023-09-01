import { ShowRefreshTokenRepository } from "repositories/refresh_token/show-refresh_token-repository";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
export declare class RefreshToken {
    private showRefreshTokenRepository;
    private showUserPerUserIdRepository;
    constructor(showRefreshTokenRepository: ShowRefreshTokenRepository, showUserPerUserIdRepository: ShowUserPerUserIdRepository);
    execute(refresh_token: string): Promise<string>;
}
