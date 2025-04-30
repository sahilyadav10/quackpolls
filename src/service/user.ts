import { apiClient } from "@/lib/apiClient";
import { UserResponse } from "@/store/slices/user/userType";

export const getUser = async () => {
  return await apiClient.get<UserResponse>("/user");
};
