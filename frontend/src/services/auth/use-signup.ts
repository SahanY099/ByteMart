import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { SignupData } from "@/schemas/signup-schema";
import { UserData, useAuthStore } from "@/store/auth";

export const useSignup = () => {
    const { setUser } = useAuthStore();
    return useMutation({
        mutationFn: async (data: SignupData) => {
            const response = await axiosClient.post("auth/signup", data);
            return response.data.data as UserData;
        },
        onSuccess: (data) => {
            setUser(data);
            toast.success("Account created successfully!");
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong.");
            }
        },
    });
};
