import { CreatePollRequest, PollForm } from "@/types/poll";

import { convertLocalToUtcString } from "../date";

export function transformPollFormDataToRequest(
  data: PollForm
): CreatePollRequest {
  return {
    question: data.question,
    isPublic: data.pollPrivacy === "PUBLIC",
    closesAt: data.closeTime ? convertLocalToUtcString(data.closeTime) : "",
    options: data.options.map((option) => ({ text: option.value })),
  };
}
