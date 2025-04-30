import { signOut } from "@/service/auth";
import { getUser } from "@/service/user";
import { useAppDispatch, useAppSelector } from "@/store";
import { userActions, userSelectors } from "@/store/slices/user/userSlice";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const isUserLoading = useAppSelector(userSelectors.selectIsUserLoading);
  const error = useAppSelector(userSelectors.selectUserError);
  const user = useAppSelector(userSelectors.selectUser);
  const { fetchUserStart, fetchUserSuccess, fetchUserFailure, clearUser } =
    userActions;

  return {
    isUserLoading,
    error,
    user,
    fetchUser: async (throwError = false) => {
      try {
        dispatch(fetchUserStart());
        const { data: response } = await getUser();
        dispatch(fetchUserSuccess(response.user));
      } catch (error: any) {
        dispatch(fetchUserFailure(error || "Failed to fetch user details"));
        if (throwError) throw error;
      }
    },
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};
