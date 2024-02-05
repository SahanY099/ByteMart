import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { LoginData } from "@/schemas/login-schema";
import { UserData, useAuthStore } from "@/store/auth";

export const useLogin = () => {
    const { setUser } = useAuthStore();
    return useMutation({
        mutationFn: async (data: LoginData) => {
            const response = await axiosClient.post("auth/login", data);
            return response.data.data as UserData;
        },
        onSuccess: (data) => {
            setUser(data);
            toast.success("Successfully logged in!");
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
