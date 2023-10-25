import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { UserType } from "./userTypes";

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

    return new User({
      email: this._props.email,
      fullName: this._props.fullName,
      userId: this._props.userId,
      verifiedEmail: this._props.verifiedEmail,
      password: this._props.password,
    });
  }
}

/* interface UpdateUser {   
  fullName?: string;
  email?: string;
  userId?: string;
  verifiedEmail?: boolean;
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}


  private async _encryptedPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
  }

  async comparePasswords(password: string) {
    const passwordIsValid = await bcrypt.compare(password, this.userPassword);

    return passwordIsValid;
  }

  private async _updatePassword(
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

    const password = await this._encryptedPassword(this._props.userPassword);

    this._props.userPassword = password;

    return;
  }
  async updateUser(props: UpdateUser) {
    if (props.email) {
      this._props.userEmail = props.email;
    }
    if (props.fullName) {
      this._props.userFullName = props.fullName;
    }

    if (
      props.newPassword &&
      props.oldPassword &&
      props.newPasswordConfirmation
    ) {
      await this._updatePassword(
        props.oldPassword,
        props.newPassword,
        props.newPasswordConfirmation
      );
    }
  }
  async resetPassword(newPassword: string) {
    const newPasswordHash = await this._encryptedPassword(newPassword);

    this._props.userPassword = newPasswordHash;

    return;
  }
*/
