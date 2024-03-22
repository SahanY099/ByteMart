import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { ProductData } from "@/types/products";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: ProductData) => {
      const response = await axiosClient.post("products/products", data);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
    },
    onError: () => {
      toast.error("Something went wrong.");

      /* if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong.");
      } */
    },
  });
};
