import { Link, MatchRoute } from "@tanstack/react-router";

import { BaseContainer } from "@/components/containers";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export const AuthNav = () => {
    return (
        <header className="border-b-2 p-3 shadow-sm dark:border-slate-800">
            <BaseContainer>
                <div className="flex flex-row items-center justify-between">
                    <Logo />
                    <div className="flex flex-row gap-4">
                        <ModeToggle />
                        <MatchRoute to="/signup">
                            <Link to="/login" preload="intent">
                                <Button className="rounded-md">Login</Button>
                            </Link>
                        </MatchRoute>
                        <MatchRoute to="/login">
                            <Link to="/signup" preload="intent">
                                <Button className="rounded-md">Sign Up</Button>
                            </Link>
                        </MatchRoute>
                    </div>
                </div>
            </BaseContainer>
        </header>
    );
};
