"use client";
import { useState } from "react";
import Button from "@/components/generic/Button";
import GenericTable from "@/components/generic/GenericTable";
import { ColumnDef } from "@tanstack/react-table";
import Pill from "@/components/generic/Pill";
import usePolls from "@/hooks/usePolls";
import { Poll } from "@/types/poll";
import { isPollActive } from "@/lib/date";

const tabs = ["Public", "Private"];

export default function Page() {
  const [activeTab, setActiveTab] = useState("Public");
  const { polls } = usePolls();

  const columns: ColumnDef<Poll>[] = [
    {
      accessorKey: "question",
      header: "Poll Name",
    },
    {
      accessorKey: "closesAt",
      header: "Status",
      cell: (info) => {
        const closesAt = info.getValue() as string;
        const _isPollActive = isPollActive(closesAt);
        return (
          <Pill
            variant={info.getValue() ? "active" : "inactive"}
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
      cell: (info) => (
        <span className="text-primary underline">View Results</span>
      ),
    },
  ];

  return (
    <div className="flex gap-8 flex-col">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Your Pond of Polls</h1>
        <Button>Hatch a New Poll</Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-6 border-b border-neutral-200">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-medium ${
                activeTab === tab
                  ? "text-neutral-900 border-b-2 border-neutral-900"
                  : "text-neutral-400"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
        <GenericTable columns={columns} data={polls || []} />
      </div>
    </div>
  );
}
