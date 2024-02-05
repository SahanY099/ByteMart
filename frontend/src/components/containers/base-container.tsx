import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type BaseContainerProps = {
    children: ReactNode;
    className?: string;
};

export const BaseContainer = ({ children, className }: BaseContainerProps) => {
    return (
        <div className={cn("mx-auto max-w-screen-xl", className)}>
            {children}
        </div>
    );
};
