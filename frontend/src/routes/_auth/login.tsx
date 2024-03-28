import { createFileRoute } from "@tanstack/react-router";

import { z } from "zod";
import { LoginForm } from "./-components/login-form";

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch("../"),
});

export const Route = createFileRoute("/_auth/login")({
  component: Login,
  validateSearch: loginSearchSchema,
});

function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium tracking-tight">Welcome again!</h1>
        <p className="text-center text-sm text-muted-foreground">
          Enter your email and password to login.
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
