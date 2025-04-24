import { apiClient } from "@/lib/apiClient";
import { User } from "@/store/slices/authType";

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpData = SignInCredentials & {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export const signIn = async (credentials: SignInCredentials) => {
  return await apiClient.post<AuthResponse>("/auth/login", credentials);
};

export const signUp = async (userData: SignUpData) => {
  return await apiClient.post<AuthResponse>("/auth/register", userData);
};

export const signOut = async (): Promise<void> => {
  return await apiClient.post("/auth/logout");
};
