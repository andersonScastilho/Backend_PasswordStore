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

  constructor(props: UserProps) {
    this.props = props;
  }

  async encryptedPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
  }

  async comparePasswords(password: string) {
    return bcrypt.compare(password, this.userPassword);
  }
}
