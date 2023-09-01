import { Storage } from "entities/Storage";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";
export declare class ShowStorage {
    private showStorageRepository;
    constructor(showStorageRepository: ShowStorageRepository);
    execute(storageId: string, userId: string): Promise<Storage>;
}
