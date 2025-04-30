"use client";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import Button from "@/components/generic/Button";
import GenericTable from "@/components/generic/GenericTable";
import Pill from "@/components/generic/Pill";
import usePolls from "@/hooks/usePolls";
import { Poll } from "@/types/poll";
import { isPollActive } from "@/lib/date";
import EmptyState from "@/components/app/EmptyState";
import LoadingSpinner from "@/components/generic/LoaderSpinner";
import { routes } from "@/lib/routes";

const tabs = ["all", "public", "private"];

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const { polls, isPending } = usePolls();

  const filteredPolls = useMemo(() => {
    return polls?.filter((poll) => {
      if (activeTab === "public") {
        return poll.public;
      } else if (activeTab === "private") {
        return !poll.public;
      }
      return true;
    });
  }, [activeTab, polls]);

  const columns: ColumnDef<Poll>[] = [
    // { accessorKey: "id", header: () => null, enableHiding: true },
    {
      accessorKey: "question",
      header: "Poll Name",
    },
    {
      accessorKey: "closesAt",
      header: "Status",
      cell: (row) => {
        const closesAt = row.getValue() as string;
        const _isPollActive = isPollActive(closesAt);
        return (
          <Pill
            variant={_isPollActive ? "active" : "inactive"}
            className="text-sm capitalize"
          >
            {_isPollActive ? "active" : "inactive"}
          </Pill>
        );
      },
    },
    {
      header: "Visibility",
      accessorFn: (row) => (row.public ? "Public" : "Private"),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <span
          className="text-primary underline cursor-pointer"
          onClick={() => {
            router.push(
              routes.results.pathname.replace("[id]", row.original.id as string)
            );
          }}
        >
          View Results
        </span>
      ),
    },
  ];

  return (
    <div className="flex gap-8 flex-col h-full">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Your Pond of Polls</h1>
        <Button disabled={isPending}>Start a New Poll</Button>
      </div>
      {isPending ? (
        <LoadingSpinner
          colour="primary"
          className="mx-auto mt-44 w-10 h-10 border-3"
        />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-6 border-b border-neutral-200">
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-medium capitalize ${
                  activeTab === tab
                    ? "text-neutral-900 border-b-2 border-neutral-900"
                    : "text-neutral-400"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>
          {filteredPolls.length === 0 ? (
            <EmptyState button={<Button>Start a New Poll</Button>} />
          ) : (
            <GenericTable columns={columns} data={filteredPolls} />
          )}
        </div>
      )}
    </div>
  );
}
