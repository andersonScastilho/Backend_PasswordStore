import { Storage } from "entities/Storage";
import { StorageRepository } from "repositories/storage-repository";

interface CreateStorageRequest {
  account: string;
  password: string;
  usageLocation: string;
  link?: string;
  description?: string;
}

type CreateStorageResponse = Storage;

export class CreateStorage {
  constructor(private storageRepository: StorageRepository) {}
  async execute({
    account,
    password,
    usageLocation,
    description,
    link,
  }: CreateStorageRequest): Promise<CreateStorageResponse> {
    const storage = new Storage({
      password,
      account,
      usageLocation,
      description,
      link,
    });

    await this.storageRepository.create(storage);

    return storage;
  }
}
