import { Storage } from "entities/Storage";
import { CreateStorageRepository } from "repositories/storage/create-storage-repository";
interface CreateStorageRequest {
    account: string;
    password: string;
    usageLocation: string;
    link?: string;
    description?: string;
    userId: string;
}
type CreateStorageResponse = Storage;
export declare class CreateStorage {
    private storageRepository;
    constructor(storageRepository: CreateStorageRepository);
    execute({ account, password, usageLocation, description, link, userId, }: CreateStorageRequest): Promise<CreateStorageResponse>;
}
export {};
