import { apiClient } from "@/lib/apiClient";

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

export const signIn = async (credentials: SignInCredentials) => {
  return await apiClient.post<null>("/auth/sign-in", credentials);
};

export const signUp = async (userData: SignUpData) => {
  return await apiClient.post<null>("/auth/sign-up", userData);
};

export const signOut = async (): Promise<void> => {
  return await apiClient.post("/auth/sign-out");
};

export const refreshToken = async (): Promise<void> => {
  return await apiClient.post("/auth/refresh");
};
