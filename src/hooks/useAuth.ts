import { useCallback } from "react";

import {
  refreshToken,
  signIn,
  SignInCredentials,
  signUp,
  SignUpData,
} from "@/service/auth";
import { signOut as signOutApiCall } from "@/service/auth";
import { getUser } from "@/service/user";
import { useAppDispatch, useAppSelector } from "@/store";
import { authActions, authSelectors } from "@/store/slices/auth/authSlice";
import { userActions } from "@/store/slices/user/userSlice";
import { useUser } from "./useUser";

export const useAuth = () => {
  const isAuthenticated = useAppSelector(authSelectors.selectIsAuthenticated);
  const isLoading = useAppSelector(authSelectors.selectIsLoading);
  const error = useAppSelector(authSelectors.selectError);
  const hasInitializedAuth = useAppSelector(
    authSelectors.selectHasInitializedAuth
  );
  const dispatch = useAppDispatch();
  const { clearUser } = useUser();

  const {
    signOut,
    initializeAuthStart,
    initializeAuthSuccess,
    initializeAuthFailure,
    refreshAuthSuccess,
    refreshAuthFailure,
  } = authActions;

  const recheckAuth = useCallback(async () => {
    dispatch(initializeAuthStart());
    try {
      await getUser();
      dispatch(initializeAuthSuccess());
    } catch {
      dispatch(initializeAuthFailure());
    }
  }, [dispatch]);

  const refreshAuth = useCallback(async () => {
    try {
      await refreshToken();
      dispatch(refreshAuthSuccess());
    } catch {
      dispatch(refreshAuthFailure());
      dispatch(userActions.clearUser());
    }
  }, [dispatch]);

  return {
    isAuthenticated,
    isLoading,
    error,
    hasInitializedAuth,
    signUp: async (signUpFormData: SignUpData) => {
      dispatch(initializeAuthStart());
      try {
        await signUp(signUpFormData);
        dispatch(initializeAuthSuccess());
      } catch (error: any) {
        dispatch(initializeAuthFailure(error.message || "Sign-up failed"));
      }
    },
    signIn: async (signInFormData: SignInCredentials) => {
      dispatch(initializeAuthStart());
      try {
        await signIn({ ...signInFormData });
        dispatch(initializeAuthSuccess());
      } catch (error: any) {
        dispatch(initializeAuthFailure(error.message || "Sign-in failed"));
      }
    },
    logout: async () => {
      dispatch(initializeAuthStart());
      try {
        clearUser();
        await signOutApiCall();
        dispatch(signOut());
      } catch (error: any) {
        dispatch(initializeAuthFailure(error.message || "Sign-out failed"));
      }
    },
    recheckAuth,
    refreshAuth,
  };
};
