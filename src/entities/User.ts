export interface UserProps {
  userFullName: string;
  userEmail: string;
  userPassword: string;
}

export class User {
  private props: UserProps;

  get userEmail() {
    return this.props.userEmail;
  }

  get userFullName() {
    return this.props.userFullName;
  }

  constructor(props: UserProps) {
    this.props = props;
  }
}
