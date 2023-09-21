import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export interface UserProps {
  userFullName: string;
  userEmail: string;
  userPassword: string;
  userId: string;
}

export class User {
  private _props: UserProps;

  get userEmail() {
    return this._props.userEmail;
  }

  get userFullName() {
    return this._props.userFullName;
  }

  get userPassword() {
    return this._props.userPassword;
  }

  get userId() {
    return this._props.userId;
  }

  constructor(props: UserProps) {
    this._props = props;
  }

  private async _encryptedPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
  }

  async comparePasswords(password: string) {
    const passwordIsValid = await bcrypt.compare(password, this.userPassword);

    return passwordIsValid;
  }

  async updatePassword(
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
  ) {
    const verifyPasswordIsStrong = (value: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      );

    const isMatchPassword = await this.comparePasswords(oldPassword);

    if (!isMatchPassword) {
      throw Error("Invalid password");
    }

    if (newPassword !== newPasswordConfirmation) {
      throw Error("Password confirmation must be the same as password");
    }

    const passwordIsStrong = verifyPasswordIsStrong(newPassword);

    if (!passwordIsStrong) {
      throw Error(
        "Senha deve conter 8+ caracteres, minúscula, maiúscula e especial"
      );
    }

    const encryptedPassword = await this._encryptedPassword(newPassword);

    this._props.userPassword = encryptedPassword;

    return;
  }

  async createUser() {
    const userId = uuidv4();

    this._props.userId = userId;

    const password = await this._encryptedPassword(this._props.userId);

    this._props.userPassword = password;

    return;
  }
}
