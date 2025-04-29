"use client";

import { useEffect } from "react";
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
  const pathname = usePathname();
  const isAuthPage =
    pathname.includes(routes.signIn.pathname) ||
    pathname.includes(routes.signUp.pathname);
  const { isAuthenticated, hasInitializedAuth, recheckAuth, refreshAuth } =
    useAuth();

  // run initial auth check
  useEffect(() => {
    recheckAuth();
  }, [recheckAuth]);

  // redirect once auth is initialized
  useEffect(() => {
    if (!hasInitializedAuth) return;

    if (isAuthenticated && isAuthPage && isAuthPage) {
      router.replace("/dashboard");
      return;
    }

    if (!isAuthenticated && !isAuthPage) {
      router.replace(routes.signIn.pathname);
    }
  }, [hasInitializedAuth, isAuthenticated, isAuthPage, router]);

  // background recheck every 12 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAuth();
    }, 12 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshAuth]);

  // block UI until initial check completes
  if (!hasInitializedAuth) {
    return (
      <LoadingSpinner
        colour="primary"
        className="mx-auto mt-44 w-10 h-10 border-3"
      />
    );
  }

  return <>{children}</>;
}
