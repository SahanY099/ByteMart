import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import LoadingButton from "@/components/loading-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import { Hint } from "@/components/hint";
import { LoginData, LoginSchema } from "@/schemas/login-schema";
import { useLogin } from "@/services/auth/use-login";

export const LoginForm = () => {
    const navigate = useNavigate({ from: "/login" });
    const { mutate, isPending, status } = useLogin();

    const form = useForm<LoginData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    useEffect(() => {
        if (status == "success") {
            navigate({ to: "../" });
        }

        return () => {};
    }, [status]);

    function onSubmit(values: LoginData) {
        mutate(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[250px] space-y-8 md:w-[350px]"
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email address"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-3 shadow-sm">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="flex flex-row items-center space-y-0 leading-none">
                                    <FormLabel>Remember</FormLabel>
                                    <Hint
                                        label="Will be logged in for 30 days"
                                        side="right"
                                        align="center"
                                        asChild
                                    >
                                        <InfoCircledIcon className="ml-2 h-5 w-5 text-foreground" />
                                    </Hint>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <LoadingButton className="w-full" loading={isPending}>
                        Login
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
};
