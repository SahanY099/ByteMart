import { RouterProvider } from "@tanstack/react-router";

import { router } from "@/router";
import { useAuthStore } from "@/store/auth";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const auth = useAuthStore();
  return <RouterProvider router={router} context={{ auth }} />;
}
