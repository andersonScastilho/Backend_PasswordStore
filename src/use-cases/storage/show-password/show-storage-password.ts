import { Storage } from "entities/storage/Storage";
import { ShowStorageRepository } from "repositories/storage/show-storage-repository";
import bcrypt from "bcrypt";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";

export class ShowStoragePassword {
  constructor(
    private showStorageRepository: ShowStorageRepository,
    private showUserPerUserIdRepository: ShowUserPerUserIdRepository
  ) {}
  async execute(
    storageId: string,
    userId: string,
    password: string
  ): Promise<string> {
    const storageSchema = await this.showStorageRepository.show(
      storageId,
      userId
    );
    if (!storageSchema) {
      throw Error("Storage not found");
    }

    const storage = new Storage({
      account: storageSchema.account,
      password: storageSchema.password,
      storageId: storageSchema.id,
      usageLocation: storageSchema.usageLocation,
      userId: storageSchema.userId,
      description: storageSchema.description,
      link: storageSchema.link,
    });

    const user = await this.showUserPerUserIdRepository.show(userId);

    if (!user) {
      throw Error("User not found");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password_hash);

    if (!passwordIsValid) {
      throw Error("Invalid password");
    }

    const descryptedPassword = storage.showPassword(storage.password);

    return descryptedPassword;
  }
}
