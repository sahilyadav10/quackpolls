import React from "react";

type ProgressBarProps = {
  votes: number;
  totalVotes: number;
};

const ProgressBar = ({ votes, totalVotes }: ProgressBarProps) => {
  const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

  return (
    <div className="w-full bg-neutral-100 rounded-2xl h-2">
      <div
        className="progress-bar bg-primary h-2 rounded-2xl"
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
