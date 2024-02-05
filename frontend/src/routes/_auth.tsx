import { Outlet, createFileRoute } from "@tanstack/react-router";

import { BaseContainer } from "@/components/containers";
import { AuthNav } from "./_auth/-components/auth-nav";

export const Route = createFileRoute("/_auth")({
    component: AuthLayout,
});

function AuthLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <AuthNav />

            <BaseContainer className="flex h-full w-full flex-1 flex-row items-center justify-center">
                <Outlet />
            </BaseContainer>
        </div>
    );
}
