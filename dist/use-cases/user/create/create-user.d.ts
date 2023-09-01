import { User } from "entities/User";
import { CreateUserRepository } from "repositories/user/create-user-repository";
import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
interface CreateUserRequest {
    userFullName: string;
    userEmail: string;
    userPassword: string;
}
type CreateUserResponse = User;
export declare class CreateUser {
    private createUserRepository;
    private showUserperEmailRepository;
    constructor(createUserRepository: CreateUserRepository, showUserperEmailRepository: ShowUserPerEmailRepository);
    execute({ userEmail, userFullName, userPassword, }: CreateUserRequest): Promise<CreateUserResponse>;
}
export {};
