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
