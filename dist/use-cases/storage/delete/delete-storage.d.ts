import { DeleteStorageRepository } from "repositories/storage/delete-storage-repository";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";
export declare class DeleteStorage {
    private deleteStorageRepository;
    private showStorageRepository;
    constructor(deleteStorageRepository: DeleteStorageRepository, showStorageRepository: ShowStorageRepository);
    execute(storageId: string, userId: string): Promise<void>;
}
