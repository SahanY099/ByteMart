import { Link } from "@tanstack/react-router";

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
                        <Link to="/">
                            <Button className="rounded-md">Login</Button>
                        </Link>
                    </div>
                </div>
            </BaseContainer>
        </header>
    );
};
