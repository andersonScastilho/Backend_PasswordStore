import { StorageSchema } from "models/storage-schema";
export interface ShowStorageRepository {
    show(storageId: string, userId: string): Promise<StorageSchema | null>;
}
