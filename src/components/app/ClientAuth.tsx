"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/lib/routes";
import LoadingSpinner from "../generic/LoaderSpinner";

export default function ClientAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentPathname = usePathname();
  const isAuthPage =
    currentPathname.includes(routes.signIn.pathname) ||
    currentPathname.includes(routes.signUp.pathname);
  const [newPathname, setNewPathname] = useState(currentPathname);

  const { isAuthenticated, recheckAuth, refreshAuth, isLoading } = useAuth();
  // run initial auth check
  useEffect(() => {
    recheckAuth();
  }, [recheckAuth]);

  // redirect once auth is initialized
  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && isAuthPage) {
      setNewPathname(routes.dashboard.pathname);
      router.replace(routes.dashboard.pathname);
      return;
    }

    if (!isAuthenticated && !isAuthPage) {
      setNewPathname(routes.signIn.pathname);
      router.replace(routes.signIn.pathname);
    }
  }, [isLoading, isAuthenticated, isAuthPage, router]);

  // background recheck every 12 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAuth();
    }, 12 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshAuth]);

  // block UI until initial check completes
  if (isLoading || newPathname !== currentPathname) {
    return (
      <LoadingSpinner
        colour="primary"
        className="mx-auto mt-44 w-10 h-10 border-3"
      />
    );
  }

  return <>{children}</>;
}
