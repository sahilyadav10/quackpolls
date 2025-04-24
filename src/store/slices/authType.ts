export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};
