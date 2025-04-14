"use client";
import Link from "next/link";

import Button from "@/components/generic/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
          Well, this isn’t the route I planned.
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          ge But hey, at least the styling still works.
        </p>
      </div>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
