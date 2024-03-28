import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React, { Suspense, useEffect } from "react";

import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/query-client";
import { AuthState, useAuthStore } from "@/store/auth";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

interface RouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Root />,
});

const Root = () => {
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    isAuthenticated();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster theme="light" richColors position="bottom-center" />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Outlet />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      <Suspense fallback={<div>Loading DevTools...</div>}>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
};
