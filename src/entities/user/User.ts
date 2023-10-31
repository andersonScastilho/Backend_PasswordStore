import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { UserType } from "./userTypes";
import { BadRequest } from "helpers/classes/BadRequest";

interface updateUserPassword {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
export class User {
  get userEmail() {
    return this._props.email;
  }

  get userFullName() {
    return this._props.fullName;
  }

  get userPassword() {
    return this._props.password;
  }

  get userId() {
    return this._props.userId;
  }

  get verifiedEmail() {
    return this._props.verifiedEmail;
  }

  set updateEmail(email: string) {
    this._props.email = email;
  }
  set updateFullName(fullName: string) {
    this._props.fullName = fullName;
  }

  constructor(private readonly _props: UserType) {}

  async createUser() {
    const minSalt = 5;
    const maxSalt = 10;

    const saltPassworHash = Math.floor(
      Math.random() * (maxSalt - minSalt) + minSalt
    );

    this._props.password = await bcrypt.hash(
      this._props.password,
      saltPassworHash
    );

    this._props.userId = randomUUID();

    return;
  }
  private async _encryptedPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
  }

  async comparePasswords(password: string) {
    const passwordIsValid = await bcrypt.compare(password, this.userPassword);

    return passwordIsValid;
  }

  async updatePassword({
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  }: updateUserPassword) {
    const verifyPasswordIsStrong = (value: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      );

    const isMatchPassword = await this.comparePasswords(oldPassword);

    if (!isMatchPassword) {
      throw new BadRequest("Invalid password");
    }

    if (newPassword !== newPasswordConfirmation) {
      throw new BadRequest(
        "Password confirmation must be the same as password"
      );
    }

    const passwordIsStrong = verifyPasswordIsStrong(newPassword);

    if (!passwordIsStrong) {
      throw new BadRequest(
        "Senha deve conter 8+ caracteres, minúscula, maiúscula e especial"
      );
    }

    const encryptedPassword = await this._encryptedPassword(newPassword);

    this._props.password = encryptedPassword;

    return;
  }

  async resetPassword(newPassword: string) {
    const newPasswordHash = await this._encryptedPassword(newPassword);

    this._props.password = newPasswordHash;

    return;
  }
}
