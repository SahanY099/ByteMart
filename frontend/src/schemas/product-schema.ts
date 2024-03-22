import { z } from "zod";

export const InventorySchema = z.object({
  quantity: z.coerce.number().min(1, { message: "Update the quantity" }),
  isDefault: z.boolean().default(false),
  price: z.coerce.number().min(1, { message: "Update the price" }),
  attributes: z
    .array(z.number())
    .min(1, { message: "Add at least one attribute" }),
});

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name is too short" }),
  description: z.string().min(10, { message: "Description is too short" }),
  productType: z.number(),
  inventories: z
    .array(InventorySchema)
    .min(1, { message: "Add at least one inventory" }),
});
