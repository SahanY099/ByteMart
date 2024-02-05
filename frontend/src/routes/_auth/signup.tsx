import { Link, createFileRoute } from "@tanstack/react-router";

import { SignupForm } from "./-components/signup-form";

export const Route = createFileRoute("/_auth/signup")({
    component: Signup,
});

function Signup() {
    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-medium tracking-tight">
                    Create an account
                </h1>
                <p className="text-center text-sm text-muted-foreground">
                    Enter your email below to create your account.
                </p>
            </div>

            <SignupForm />

            <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our
                <br />
                <Link
                    to="../"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Terms of Service
                </Link>
                &nbsp; and &nbsp;
                <Link
                    to="../"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    );
}
