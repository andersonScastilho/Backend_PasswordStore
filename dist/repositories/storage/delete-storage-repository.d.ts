export interface DeleteStorageRepository {
    delete(storageId: string): Promise<void>;
}
