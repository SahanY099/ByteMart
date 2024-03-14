import { DoorOpen } from "lucide-react";

import { Hint } from "@/components/hint";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <div className="flex flex-col gap-4">
            <ModeToggle />
            <Hint label="Logout" side="right" asChild>
                <Button variant="outline" size="icon">
                    <DoorOpen className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </Hint>
        </div>
    );
};
