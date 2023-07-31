import { Storage } from "entities/Storage";
import { CreateStorageRepository } from "repositories/storage/create-storage-repository";

export class InMemoryStorageRepository implements CreateStorageRepository {
  public items: Storage[] = [];

  async create(storage: Storage): Promise<Storage> {
    this.items.push(storage);

    return storage;
  }
}
