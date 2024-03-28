import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect } from "react";

import { Header } from "./dashboard/-components/header";
import { Sidebar } from "./dashboard/-components/sidebar";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/dashboard/sidebar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated()) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function DashboardLayout() {
  const { collapsed, collapse, expand } = useSidebar();
  const isScreenLg = useMediaQuery("only screen and (min-width : 1024px)");

  useEffect(() => {
    if (isScreenLg) {
      expand();
    } else {
      collapse();
    }
  }, [isScreenLg, collapse, expand]);

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Sidebar />
      <div
        className={cn(
          "ml-[80px] flex min-h-screen flex-1 flex-col gap-4 p-4 transition-all duration-300 lg:ml-[95px]",
          !collapsed && "lg:ml-[215px]",
        )}
      >
        <Header />
        <div className="flex-1 rounded-lg border-2 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
