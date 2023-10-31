import { decrypt } from "utils/crypt";
import { v4 as uuidv4 } from "uuid";
import { encrypt } from "../../utils/crypt";
import { StorageType, UpdateStorage } from "./storageTypes";

export class Storage {
  private props: StorageType;

  get storageId() {
    return this.props.storageId;
  }
  get password() {
    return this.props.password;
  }
  get account() {
    return this.props.account;
  }
  get usageLocation() {
    return this.props.usageLocation;
  }
  get link() {
    return this.props.link;
  }
  get description() {
    return this.props.description;
  }
  get userId() {
    return this.props.userId;
  }

  constructor(props: StorageType) {
    this.props = props;
  }

  showPassword(storgePassword: string) {
    const [iv, content, tag] = storgePassword.split(":");

    const password = decrypt({ iv, content, tag });

    return password;
  }

  createStorage() {
    const uuid = uuidv4();

    const { iv, content, tag } = encrypt(this.props.password);

    const encryptedPassword = `${iv}:${content}:${tag}`;

    this.props.password = encryptedPassword;
    this.props.storageId = uuid;

    return;
  }

  updateStorage(props: UpdateStorage) {
    if (props.password) {
      const { iv, content, tag } = encrypt(props.password);
      const encryptedPassword = `${iv}:${content}:${tag}`;

      this.props.password = encryptedPassword;
    }

    if (props.account) {
      this.props.account = props.account;
    }

    if (props.description) {
      this.props.description = props.description;
    }

    if (props.link) {
      this.props.link = props.link;
    }
    if (props.usageLocation) {
      this.props.usageLocation = props.usageLocation;
    }
  }
}
