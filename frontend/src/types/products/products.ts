import { InventorySchema, ProductSchema } from "@/schemas/product-schema";
import { z } from "zod";

export type ProductData = z.infer<typeof ProductSchema>;
export type InventoryData = z.infer<typeof InventorySchema>;
