export type User = {
  id: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  age: number | undefined;
  gender: string | undefined;
};

export type UserState = {
  data: User | null;
  isLoading: boolean;
  error: string | null;
};

export type UserResponse = {
  user: User;
  accessTokenExpiresAt: string;
};
