import { v4 as uuidv4 } from "uuid";

import { Storage } from "entities/Storage";
import { CreateStorageRepository } from "repositories/storage/create-storage-repository";
import { encrypt } from "../../../utils/crypt";
interface CreateStorageRequest {
  account: string;
  password: string;
  usageLocation: string;
  link?: string;
  description?: string;
  userId: string;
}

type CreateStorageResponse = Storage;

export class CreateStorage {
  constructor(private storageRepository: CreateStorageRepository) {}
  async execute({
    account,
    password,
    usageLocation,
    description,
    link,
    userId,
  }: CreateStorageRequest): Promise<CreateStorageResponse> {
    const storageId = uuidv4();

    const { iv, content } = encrypt(password);

    const encryptedPassword = `${iv}:${content}`;

    const storage = new Storage({
      password: encryptedPassword,
      account,
      usageLocation,
      description,
      link,
      userId,
      storageId,
    });

    await this.storageRepository.create(storage);

    return storage;
  }
}
