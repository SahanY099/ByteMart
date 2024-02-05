import { createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "./-components/login-form";

export const Route = createFileRoute("/_auth/login")({
    component: Login,
});

function Login() {
    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-medium tracking-tight">
                    Welcome again!
                </h1>
                <p className="text-center text-sm text-muted-foreground">
                    Enter your email and password to login.
                </p>
            </div>

            <LoginForm />
        </div>
    );
}
