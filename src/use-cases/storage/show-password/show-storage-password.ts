import { Storage } from "entities/Storage";
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
    const storage = await this.showStorageRepository.show(storageId, userId);
    if (!storage) {
      throw Error("Storage not found");
    }

    const instanceStorage = new Storage({
      account: storage.account,
      password: storage.password,
      storageId: storage.id,
      usageLocation: storage.usageLocation,
      userId: storage.userId,
      description: storage.description ?? "",
      link: storage.link ?? "",
    });

    const user = await this.showUserPerUserIdRepository.show(userId);

    if (!user) {
      throw Error("User not found");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password_hash);

    if (!passwordIsValid) {
      throw Error("Invalid password");
    }

    const descryptedPassword = instanceStorage.showPassword(
      instanceStorage.password
    );

    return descryptedPassword;
  }
}
