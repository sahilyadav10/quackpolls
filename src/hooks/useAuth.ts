import { signIn, SignInCredentials, signUp, SignUpData } from "@/service/auth";
import { useAppDispatch, useAppSelector } from "@/store";
import { authActions, authSelectors } from "@/store/slices/auth/authSlice";

export const useAuth = () => {
  const isAuthenticated = useAppSelector(authSelectors.selectIsAuthenticated);
  const isLoading = useAppSelector(authSelectors.selectIsLoading);
  const error = useAppSelector(authSelectors.selectError);
  const { signInStart, signInFailure, signInSuccess, signOut } = authActions;

  const dispatch = useAppDispatch();

  return {
    isAuthenticated,
    isLoading,
    error,
    signUp: async (signUpFormData: SignUpData) => {
      try {
        dispatch(signInStart());
        await signUp({
          ...signUpFormData,
        });
        dispatch(signInSuccess());
      } catch (error: any) {
        dispatch(signInFailure(error || "Login failed"));
      }
    },
    signIn: async (signInFormData: SignInCredentials) => {
      try {
        dispatch(signInStart());
        await signIn({
          ...signInFormData,
        });
        dispatch(signInSuccess());
      } catch (error: any) {
        dispatch(signInFailure(error || "Login failed"));
      }
    },
    logout: () => dispatch(signOut()),
  };
};
