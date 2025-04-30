"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { FaRegClock, FaUsers } from "react-icons/fa6";

import Button from "@/components/generic/Button";
import LoadingSpinner from "@/components/generic/LoaderSpinner";
import Pill from "@/components/generic/Pill";
import ProgressBar from "@/components/generic/ProgressBar";
import usePoll from "@/hooks/usePoll";
import { useUser } from "@/hooks/useUser";
import { calculateTimeDifference, isPollActive } from "@/lib/date";
import { calculateVotes } from "@/lib/vote";
import { submitVote } from "@/service/polls";

export default function Page() {
  const { id }: { id: string } = useParams();
  const { poll, isPending } = usePoll({ id });
  const { user } = useUser();
  const isCurrentUserCreator = user?.id === poll?.creator?.id;
  const timeLeft = calculateTimeDifference(poll?.closesAt);
  const totalVotes = calculateVotes(poll);
  const _isPollActive = poll?.closesAt && isPollActive(poll?.closesAt);

  const [selectedOptionId, setSelectedOptionId] = useState<string>("");

  const onSubmit = async () => {
    await submitVote(id, {
      optionId: selectedOptionId,
      voterIdentifier: "hello",
    });
  };
  return (
    <div className="flex gap-8 flex-col items-center">
      {isPending ? (
        <LoadingSpinner
          colour="primary"
          className="mx-auto mt-44 w-10 h-10 border-3"
        />
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            <h1 className="font-semibold text-2xl text-left">
              {poll?.question}
            </h1>
            <Pill
              variant={_isPollActive ? "active" : "inactive"}
              className="text-sm capitalize"
            >
              {_isPollActive ? "active" : "inactive"}
            </Pill>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {poll?.options.map((option, index) => {
              return (
                <div
                  className={`flex items-center gap-2 bg-white rounded-2xl px-4 py-3
           border border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary w-full ${
             !isCurrentUserCreator ? "cursor-pointer" : "flex-col! items-start"
           } ${
                    option?.id === selectedOptionId
                      ? "border-1 border-primary"
                      : ""
                  }`}
                  id={option.id}
                  key={option.id}
                  onClick={() => {
                    if (isCurrentUserCreator) return;
                    setSelectedOptionId(option.id);
                  }}
                >
                  {!isCurrentUserCreator && (
                    <div
                      className={`w-4 border border-primary h-4 rounded-full ${
                        option?.id === selectedOptionId ? "p-[2px]" : ""
                      }`}
                    >
                      <div
                        className={`rounded-full w-full h-full ${
                          option?.id === selectedOptionId ? "bg-primary" : ""
                        }`}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between w-full">
                    <span>{option.text}</span>
                    {isCurrentUserCreator && (
                      <span className="text-neutral-500 text-xs">
                        {option.voteCount} votes
                      </span>
                    )}
                  </div>
                  {isCurrentUserCreator && (
                    <ProgressBar
                      totalVotes={totalVotes}
                      votes={option.voteCount || 0}
                    />
                  )}
                </div>
              );
            })}
            <div className="flex items-center justify-between">
              {isCurrentUserCreator && (
                <div className="flex items-center gap-10">
                  <div className="flex gap-2 items-center">
                    <FaRegClock className="text-neutral-400" />
                    <p className="text-neutral-400 text-xs">
                      {timeLeft?.days} days {timeLeft?.hours} hours{" "}
                      {timeLeft?.minutes} minutes left
                    </p>
                  </div>
                  {totalVotes >= 0 ? (
                    <div className="flex gap-2 items-center">
                      <FaUsers className="text-neutral-400" />
                      <p className="text-neutral-400 text-xs">
                        {totalVotes} votes
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
              <Button
                className="place-self-end"
                onClick={onSubmit}
                disabled={!selectedOptionId}
              >
                Submit Vote
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
