import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
import { UpdateUserRepository } from "repositories/user/update-user-repository";
interface UpdateUserRequest {
    userId: string;
    email?: string;
    oldPassword?: string;
    fullName?: string;
    newPassword?: string;
    newPasswordConfirmation?: string;
}
export declare class UpdateUser {
    private showUserPerUserIdRepository;
    private updateUserRepository;
    constructor(showUserPerUserIdRepository: ShowUserPerUserIdRepository, updateUserRepository: UpdateUserRepository);
    handle({ userId, email, fullName, oldPassword, newPassword, newPasswordConfirmation, }: UpdateUserRequest): Promise<import("../../../models/user-schema").UserSchema>;
}
export {};
