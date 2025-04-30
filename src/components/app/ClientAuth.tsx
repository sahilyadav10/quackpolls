"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { authRoutes, routes } from "@/lib/routes";
import LoadingSpinner from "../generic/LoaderSpinner";
import { useUser } from "@/hooks/useUser";

const isEitherRouteAuth = ({
  currentPathname,
  newPathname,
}: {
  currentPathname: string;
  newPathname: string;
}) => {
  return (
    authRoutes.includes(currentPathname) || authRoutes.includes(newPathname)
  );
};

export default function ClientAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentPathname = usePathname();
  const isAuthPage = authRoutes.includes(currentPathname);

  const [newPathname, setNewPathname] = useState(currentPathname);
  const { isAuthenticated, recheckAuth, refreshAuth, isLoading } = useAuth();
  const { isUserLoading } = useUser();

  // run initial auth check
  useEffect(() => {
    recheckAuth();
  }, [recheckAuth]);

  // redirect once auth is initialized
  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && isAuthPage) {
      setNewPathname(routes.polls.pathname);
      router.replace(routes.polls.pathname);
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
  if (
    isLoading ||
    isUserLoading ||
    (newPathname !== currentPathname &&
      isEitherRouteAuth({ currentPathname, newPathname }))
  ) {
    return (
      <LoadingSpinner
        colour="primary"
        className="mx-auto mt-44 w-10 h-10 border-3"
      />
    );
  }

  return <>{children}</>;
}
