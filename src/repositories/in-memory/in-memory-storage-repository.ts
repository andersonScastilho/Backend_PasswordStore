import { Storage } from "entities/Storage";
import { StorageRepository } from "repositories/storage/create-storage-repository";

export class InMemoryStorageRepository implements StorageRepository {
  public items: Storage[] = [];

  async create(storage: Storage): Promise<Storage> {
    this.items.push(storage);

    return storage;
  }
}
