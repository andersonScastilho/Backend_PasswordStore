import bcrypt from "bcrypt";
import { decrypt } from "utils/crypt";

interface StorageProps {
  storageId: string;
  password: string;
  account: string;
  usageLocation: string;
  link?: string;
  description?: string;
  userId: string;
}

export class Storage {
  private props: StorageProps;

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
    return this.props.usageLocation;
  }
  get description() {
    return this.props.description;
  }
  get userId() {
    return this.props.userId;
  }

  constructor(props: StorageProps) {
    this.props = props;
  }

  showPassword(userPassword: string, hashPassword: string) {
    const passwordIsValid = bcrypt.compare(userPassword, hashPassword);

    if (!passwordIsValid) {
      throw Error("Invalid password");
    }

    const [iv, content, tag] = userPassword.split(":");

    const password = decrypt({ iv, content, tag });

    return password;
  }
}
