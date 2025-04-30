import { apiClient } from "@/lib/apiClient";
import { transformPollFormDataToRequest } from "@/lib/transformers/pollTransformer";
import { Poll, PollForm, VoteRequest } from "@/types/poll";

export const getPolls = async () => {
  return await apiClient.get<Poll[]>("/polls");
};

export const createPoll = async (data: PollForm) => {
  const transformedData = transformPollFormDataToRequest(data);

  return await apiClient.post<Poll>("/polls", transformedData);
};

export const getPoll = async (id: string) => {
  return await apiClient.get<Poll>(`/polls/${id}`);
};

export const submitVote = async (id: string, data: VoteRequest) => {
  return await apiClient.post<VoteRequest>(`/polls/${id}/`, data);
};
