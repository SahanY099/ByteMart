import { useAuthStore } from "@/store/auth";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/_browse/")({
    component: Index,
});

function Index() {
    const { user, isAuthenticated } = useAuthStore();

    useEffect(() => {
        isAuthenticated();

        return () => {};
    }, [user]);

    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
        </div>
    );
}
