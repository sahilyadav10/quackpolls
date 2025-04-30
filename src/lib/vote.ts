import { Poll } from "@/types/poll";

export const calculateVotes = (poll?: Poll) => {
  if (!poll) return 0;

  return poll.options.reduce(
    (total, option) => total + (option?.voteCount || 0),
    0
  );
};
