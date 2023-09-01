import { StorageSchema } from "models/storage-schema";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";
export declare class PostgresShowStorageRepository implements ShowStorageRepository {
    show(storageId: string, userId: string): Promise<StorageSchema | null>;
}
