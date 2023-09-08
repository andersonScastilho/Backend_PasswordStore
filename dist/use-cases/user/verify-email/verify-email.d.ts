import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
export declare class VerifyEmail {
    private showUserPerIdRepository;
    constructor(showUserPerIdRepository: ShowUserPerUserIdRepository);
    execute(token: string): Promise<boolean>;
}
