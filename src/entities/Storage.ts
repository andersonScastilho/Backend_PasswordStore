interface StorageProps {
  password: string;
  account: string;
  usageLocation: string;
  link?: string;
  description?: string;
}

export class Storage {
  private props: StorageProps;

  get usageLocation() {
    return this.props.usageLocation;
  }

  get link() {
    return this.props.usageLocation;
  }

  constructor(props: StorageProps) {
    this.props = props;
  }
}
