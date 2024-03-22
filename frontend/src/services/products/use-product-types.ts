import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { Attribute, ProductType } from "@/types/products";

export const useGetProductTypes = () => {
  return useQuery({
    queryKey: ["product-types"],
    queryFn: async () => {
      const { data } = await axiosClient.get("products/types");

      return data.data as ProductType[];
    },
  });
};

export const useGetProductTypeAttributes = (typeId: number) => {
  return useQuery({
    queryKey: [`product-type-attributes`, typeId],
    queryFn: async () => {
      const response = await axiosClient.get(
        `products/types/${typeId}/attributes`,
      );

      return response.data.data as Attribute[];
    },
  });
};
