import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_admin")({
  component: () => <Outlet />,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user.isAdmin) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
