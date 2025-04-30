export enum PollPrivacy {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type PollForm = {
  question: string;
  options: { value: string }[];
  pollPrivacy: PollPrivacy;
  closeTime: Date | null;
};

export type Poll = {
  id: string;
  userId: string;
  question: string;
  closesAt: string;
  createdAt: string;
  creator: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string | null;
    age: number;
  };
  options: {
    id: string;
    text: string;
    voteCount?: number;
  }[];
  public: boolean;
};

export type CreatePollRequest = {
  question: string;
  isPublic: boolean;
  closesAt: string; // UTC formatted "2025-04-30T05:30:00"
  options: { text: string }[];
};

export type VoteRequest = {
  optionId: string;
  voterIdentifier: string;
};
