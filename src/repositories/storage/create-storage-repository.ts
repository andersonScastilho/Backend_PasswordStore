import { Storage } from "entities/Storage";

export interface CreateStorageRepository {
  create(storage: Storage): Promise<Storage>;
}
