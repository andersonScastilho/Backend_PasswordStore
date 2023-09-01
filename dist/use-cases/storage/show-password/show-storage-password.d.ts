import { ShowStorageRepository } from "repositories/storage/show-storage-repository";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
export declare class ShowStoragePassword {
    private showStorageRepository;
    private showUserPerUserIdRepository;
    constructor(showStorageRepository: ShowStorageRepository, showUserPerUserIdRepository: ShowUserPerUserIdRepository);
    execute(storageId: string, userId: string, password: string): Promise<string>;
}
