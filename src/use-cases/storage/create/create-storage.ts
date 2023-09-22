import { Storage } from "entities/Storage";
import { CreateStorageRepository } from "repositories/storage/create-storage-repository";

export class CreateStorage {
  constructor(
    private _storage: Storage,
    private storageRepository: CreateStorageRepository
  ) {}
  async execute(): Promise<void> {
    this._storage.createStorage();

    await this.storageRepository.create(this._storage);

    return;
  }
}
