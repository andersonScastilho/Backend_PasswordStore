import { User } from "entities/User";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
export declare class ShowUser {
    private showUserRepository;
    constructor(showUserRepository: ShowUserPerUserIdRepository);
    execute(userId: string): Promise<User>;
}
