import { Storage } from "entities/Storage";
import { StorageSchema } from "models/storage-schema";

export interface CreateStorageRepository {
  create(storage: Storage): Promise<StorageSchema>;
}
