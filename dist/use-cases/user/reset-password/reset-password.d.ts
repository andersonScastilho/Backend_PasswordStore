import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
export declare class ResetPassword {
    private showUserPerIdRepository;
    constructor(showUserPerIdRepository: ShowUserPerUserIdRepository);
    execute(token: string, newPassword: string): Promise<void>;
}
