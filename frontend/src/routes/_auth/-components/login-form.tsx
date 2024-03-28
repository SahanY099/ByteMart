import { zodResolver } from "@hookform/resolvers/zod";
import { getRouteApi } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/loading-button";
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
import { router } from "@/router";
import { LoginSchema } from "@/schemas/auth";
import { useLogin } from "@/services/auth";
import { LoginData } from "@/types/auth";

export const LoginForm = () => {
  const search = getRouteApi("/_auth/login").useSearch();
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
      router.history.push(search.redirect);
    }

    return () => {};
  }, [status, search]);

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
                  <Input placeholder="Enter your email address" {...field} />
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
                <FormLabel>Remember</FormLabel>

                <div className="flex flex-row items-center space-y-0 leading-none">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Hint
                    label="You will be logged in for 30 days"
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
