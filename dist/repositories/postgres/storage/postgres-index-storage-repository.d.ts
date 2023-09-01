import { StorageSchema } from "models/storage-schema";
import { IndexStorageRepository } from "repositories/storage/index-storage-repository";
export declare class PostgresIndexStorageRepository implements IndexStorageRepository {
    index(userId: string): Promise<StorageSchema[]>;
}
