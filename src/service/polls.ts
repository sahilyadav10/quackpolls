import { apiClient } from "@/lib/apiClient";
import { transformPollFormDataToRequest } from "@/lib/transformers/pollTransformer";
import { Poll, PollForm } from "@/types/poll";

export const getPolls = async () => {
  return await apiClient.get<Poll[]>("/polls");
};

export const createPoll = async (data: PollForm) => {
  const transformedData = transformPollFormDataToRequest(data);

  return await apiClient.post<Poll>("/polls", transformedData);
};
