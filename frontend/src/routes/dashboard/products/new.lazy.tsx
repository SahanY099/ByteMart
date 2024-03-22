import { createLazyFileRoute } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator";
import { ProductForm } from "./-components/product-form";

export const Route = createLazyFileRoute("/dashboard/products/new")({
  component: NewProduct,
});

function NewProduct() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="items-center text-lg font-medium">
            Create a New Product
          </h1>
        </div>
      </div>
      <Separator />
      <ProductForm />
    </div>
  );
}
