import { Storage } from "entities/Storage";
import { StorageSchema } from "models/storage-schema";
import { CreateStorageRepository } from "repositories/storage/create-storage-repository";
export declare class PostgresStorageRepository implements CreateStorageRepository {
    create(storage: Storage): Promise<StorageSchema>;
}
