export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasInitializedAuth: boolean;
};
