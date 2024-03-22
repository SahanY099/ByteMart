import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/products/")({
  component: () => <div>Hello /dashboard/products/!</div>,
});
