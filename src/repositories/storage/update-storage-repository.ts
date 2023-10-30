import { Storage } from "entities/storage/Storage";
import { StorageSchema } from "models/storage-schema";

export interface UpdateStorageRepository {
  update(storage: Storage): Promise<StorageSchema>;
}
