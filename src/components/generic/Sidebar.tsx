"use client";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { usePathname } from "next/navigation";

import { sidebarRoutesArray } from "@/lib/routes";
import { useUser } from "@/hooks/useUser";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <div className="flex w-full md:w-60 border-r border-r-neutral-200 items-start py-4 md:py-8 justify-between md:flex-col flex-row md:overflow-auto overflow-scroll">
      <div className="flex gap-2 w-full justify-between md:flex-col flex-row">
        {sidebarRoutesArray.map((route) => {
          return (
            <Link
              className={`flex gap-2 items-center font-medium px-2 md:pl-6 py-2 hover:bg-neutral-200 w-full ${
                route.pathname === pathname
                  ? "bg-neutral-200 cursor-default"
                  : ""
              }`}
              href={route.pathname}
              key={route.pathname}
            >
              {route.icon}
              {route.label}
            </Link>
          );
        })}
      </div>
      <div className="hidden md:flex flex-col gap-2 w-full">
        <div className="flex gap-2 items-center font-medium pl-6 py-2">
          <RxAvatar className="text-[24px]" strokeWidth={0.6} />
          {user?.firstName} {user?.lastName}
        </div>
      </div>
    </div>
  );
}
