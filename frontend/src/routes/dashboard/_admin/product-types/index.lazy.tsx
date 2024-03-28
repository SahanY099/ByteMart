import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/_admin/product-types/")({
  component: () => <div>Manage product types</div>,
});
