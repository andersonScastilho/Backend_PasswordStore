import { StorageSchema } from "models/storage-schema";

export interface IndexStorageRepository {
  index(userId: string): Promise<StorageSchema[]>;
}
