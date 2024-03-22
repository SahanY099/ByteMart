import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Inventories } from "./inventories";

import { ProductTypeField } from "@/routes/dashboard/products/-components/product-form/product-type-field";
import { ProductSchema } from "@/schemas/product-schema";
import { useCreateProduct } from "@/services/products/";
import { ProductData } from "@/types/products";

export const ProductForm = () => {
  const form = useForm<ProductData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      productType: undefined,
      inventories: [],
    },
  });

  const createProduct = useCreateProduct();

  function onSubmit(values: ProductData) {
    createProduct.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-start gap-4 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a name of your product"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full md:w-72">
            <ProductTypeField />
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a description for your product"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <FormLabel>Images</FormLabel>
          <div className="flex flex-row flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-40 w-60 rounded-lg border-2 border-dashed"></div>
              <span>Hello</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-40 w-60 rounded-lg border-2 border-dashed"></div>
              <span>Hello</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-40 w-60 rounded-lg border-2 border-dashed"></div>
              <span>Hello</span>
            </div>
          </div>
        </div>

        <Inventories />

        <div>
          <LoadingButton className="w-full" loading={false} type="submit">
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
