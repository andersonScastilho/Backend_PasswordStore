interface StorageProps {
    storageId: string;
    password: string;
    account: string;
    usageLocation: string;
    link?: string;
    description?: string;
    userId: string;
}
export declare class Storage {
    private props;
    get storageId(): string;
    get password(): string;
    get account(): string;
    get usageLocation(): string;
    get link(): string | undefined;
    get description(): string | undefined;
    get userId(): string;
    set updatePassword(data: string);
    constructor(props: StorageProps);
    showPassword(storgePassword: string): string;
}
export {};
