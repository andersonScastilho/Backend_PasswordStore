export type UserType = {
  email: string;
  fullName: string;
  userId: string;
  verifiedEmail: boolean;
  password: string;
};

export type UserTypeReturn = Partial<UserType>;
