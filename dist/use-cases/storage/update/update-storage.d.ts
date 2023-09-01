import { Storage } from "entities/Storage";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";
import { UpdateStorageParams, UpdateStorageRepository } from "repositories/storage/update-storage-repository";
export declare class UpdateStorage {
    private updateStorageReposirory;
    private showStorageRepository;
    constructor(updateStorageReposirory: UpdateStorageRepository, showStorageRepository: ShowStorageRepository);
    execute({ storageId, account, description, link, usageLocation, userId, password, }: UpdateStorageParams): Promise<Storage>;
}
