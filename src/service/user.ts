import { apiClient } from "@/lib/apiClient";
import { User } from "@/store/slices/user/userType";

export const getUser = async () => {
  return await apiClient.get<User>("/user");
};
