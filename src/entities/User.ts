import bcrypt from "bcrypt";
export interface UserProps {
  userFullName: string;
  userEmail: string;
  userPassword: string;
  userId: string;
}

export class User {
  private props: UserProps;
  get userEmail() {
    return this.props.userEmail;
  }

  get userFullName() {
    return this.props.userFullName;
  }

  get userPassword() {
    return this.props.userPassword;
  }

  get userId() {
    return this.props.userId;
  }

  set hashPasswordToUserPassword(hashPassword: string) {
    this.props.userPassword = hashPassword;
  }

  set updateUserFullName(fullName: string) {
    this.props.userFullName = fullName;
  }

  set updateUserEmail(email: string) {
    this.props.userEmail = email;
  }

  constructor(props: UserProps) {
    this.props = props;
  }

  async encryptedPassword(password: string) {
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
    const isMatchPassword = await this.comparePasswords(oldPassword);

    if (!isMatchPassword) {
      throw Error("Invalid password");
    }

    if (newPassword !== newPasswordConfirmation) {
      throw Error("Password confirmation must be the same as password");
    }

    const encryptedPassword = await this.encryptedPassword(newPassword);

    this.props.userPassword = encryptedPassword;

    return;
  }
}
