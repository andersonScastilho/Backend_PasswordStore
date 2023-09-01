import { StorageSchema } from "models/storage-schema";
import { UpdateStorageParams, UpdateStorageRepository } from "repositories/storage/update-storage-repository";
export declare class PostgresUpdateStorageRepository implements UpdateStorageRepository {
    update({ account, description, link, usageLocation, storageId, password, }: UpdateStorageParams): Promise<StorageSchema>;
}
