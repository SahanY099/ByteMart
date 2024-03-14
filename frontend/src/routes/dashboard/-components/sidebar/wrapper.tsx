import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/dashboard/sidebar";

type WrapperProps = {
    children: ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
    const { collapsed } = useSidebar();
    return (
        <div className="fixed z-50 h-screen lg:p-4">
            <div
                className={cn(
                    "h-full w-[80px] overflow-x-hidden border-r bg-background transition-all duration-300 lg:border-0",
                    !collapsed && "w-[200px]",
                )}
            >
                <div className="flex h-full w-full flex-col items-center justify-between px-4 py-4 lg:rounded-lg lg:border-2 lg:shadow-lg">
                    {children}
                </div>
            </div>
        </div>
    );
};
