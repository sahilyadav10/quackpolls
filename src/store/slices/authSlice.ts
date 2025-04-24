import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./authType";
import type { User } from "./authType";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

// Selectors
const selectUser = (state: { auth: AuthState }) => state.auth.user;
const selectToken = (state: { auth: AuthState }) => state.auth.token;
const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
const selectError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
export const authActions = authSlice.actions;
export const authSelectors = {
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
};
