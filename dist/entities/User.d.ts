export interface UserProps {
    userFullName: string;
    userEmail: string;
    userPassword: string;
    userId: string;
}
export declare class User {
    private props;
    get userEmail(): string;
    get userFullName(): string;
    get userPassword(): string;
    get userId(): string;
    set hashPasswordToUserPassword(hashPassword: string);
    set updateUserFullName(fullName: string);
    set updateUserEmail(email: string);
    constructor(props: UserProps);
    encryptedPassword(password: string): Promise<string>;
    comparePasswords(password: string): Promise<boolean>;
    updatePassword(oldPassword: string, newPassword: string, newPasswordConfirmation: string): Promise<void>;
}
