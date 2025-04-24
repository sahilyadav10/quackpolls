import { signIn, SignInCredentials, signUp, SignUpData } from "@/service/auth";
import { useAppDispatch, useAppSelector } from "@/store";
import { authActions, authSelectors } from "@/store/slices/authSlice";

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
        const { data: response } = await signUp({
          ...signUpFormData,
        });
        dispatch(
          signInSuccess({
            user: response.user,
            token: response.token,
          })
        );
      } catch (error: any) {
        dispatch(signInFailure(error?.message || "Login failed"));
      }
    },
    signIn: async (signInFormData: SignInCredentials) => {
      try {
        dispatch(signInStart());
        const { data: response } = await signIn({
          ...signInFormData,
        });
        dispatch(
          signInSuccess({
            user: response.user,
            token: response.token,
          })
        );
      } catch (error: any) {
        dispatch(signInFailure(error?.message || "Login failed"));
      }
    },
    logout: () => dispatch(signOut()),
  };
};
