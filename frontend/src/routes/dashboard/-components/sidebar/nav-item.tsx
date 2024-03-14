import { Link, ToPathOption } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/dashboard/sidebar";

type NavItemProps = {
    name: string;
    href: ToPathOption;
    icon: LucideIcon;
    isActive: boolean;
};

export const NavItem = ({ name, href, isActive, icon: Icon }: NavItemProps) => {
    const { collapsed } = useSidebar();

    const Item = () => (
        <Button
            variant="ghost"
            asChild
            className={cn(
                "flex h-auto w-full flex-row justify-start p-2 text-sm transition-none",
                isActive && "bg-accent",
                !collapsed && "px-4 py-2",
            )}
        >
            <Link to={href}>
                <div>
                    <Icon className="h-5 w-5" />
                </div>

                <span
                    className={cn(
                        "ml-2",
                        collapsed && "hidden",
                        !collapsed && "inline",
                    )}
                >
                    {name}
                </span>
            </Link>
        </Button>
    );

    return (
        <>
            {collapsed ? (
                <Hint label={name} side="right">
                    <Item />
                </Hint>
            ) : (
                <Item />
            )}
        </>
    );
};
