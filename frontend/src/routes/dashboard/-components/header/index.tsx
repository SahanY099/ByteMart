import { Link } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { CommandMenu } from "./command-menu";

export const Header = () => {
    return (
        <div className="flex w-full flex-row items-center justify-between rounded-lg border-2 p-4">
            <div className="flex flex-row items-center gap-4">
                <Hint label="Goto Home" side="right">
                    <Button className="h-auto rounded-lg p-2" asChild>
                        <Link to="/">
                            <HomeIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                </Hint>
                <CommandMenu />
            </div>
            <div className="flex flex-row items-center gap-4">
                <UserProfile greeting={true} />
            </div>
        </div>
    );
};
