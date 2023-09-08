import { ShowUserPerEmailRepository } from "repositories/user/show-user-email-repository";
export declare class ForgotPassword {
    private showUserPerEmail;
    constructor(showUserPerEmail: ShowUserPerEmailRepository);
    execute(email: string): Promise<void>;
}
