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
    fetchUser: async () => {
      try {
        dispatch(fetchUserStart());
        const { data: response } = await getUser();
        dispatch(fetchUserSuccess(response));
      } catch (error: any) {
        dispatch(fetchUserFailure(error || "Failed to fetch user details"));
      }
    },
    clearUser: async () => {
      try {
        dispatch(fetchUserStart());
        dispatch(clearUser());
      } catch (error: any) {
        dispatch(fetchUserFailure(error || "Login failed"));
      }
    },
  };
};
