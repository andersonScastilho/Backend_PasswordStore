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
  constructor(props: UserProps) {
    this.props = props;
  }
}
