import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "./userType";

const initialState: UserState = {
  data: {
    id: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    age: undefined,
    gender: undefined,
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.data = {
        id: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        age: undefined,
        gender: undefined,
      };
      state.isLoading = false;
      state.error = null;
    },
  },
});

// Selectors
const selectUser = (state: { user: UserState }) => state.user.data;
const selectIsUserLoading = (state: { user: UserState }) =>
  state.user.isLoading;
const selectUserError = (state: { user: UserState }) => state.user.error;

const userReducer = userSlice.reducer;
export default userReducer;
export const userActions = userSlice.actions;
export const userSelectors = {
  selectUser,
  selectIsUserLoading,
  selectUserError,
};
