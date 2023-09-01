import { DeleteStorageRepository } from "repositories/storage/delete-storage-repository";
export declare class PostgresDeleteStorageRepository implements DeleteStorageRepository {
    delete(storageId: string): Promise<void>;
}
