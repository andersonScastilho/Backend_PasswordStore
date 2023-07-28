import { Storage } from "entities/Storage";

export interface StorageRepository {
  create(storage: Storage): Promise<Storage>;
}
