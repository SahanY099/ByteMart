import { useRouterState } from "@tanstack/react-router";
import { Inbox, Layers, MessagesSquare, Package } from "lucide-react";

import { NavItem } from "./nav-item";

const links = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: Layers,
    },
    {
        name: "My Listings",
        href: "/dashboard/my-listings",
        icon: Package,
    },
    {
        name: "Orders",
        href: "/dashboard/orders",
        icon: Inbox,
    },
    {
        name: "Messages",
        href: "/dashboard/messages",
        icon: MessagesSquare,
    },
];

export const Nav = () => {
    const router = useRouterState();

    return (
        <div className="flex w-full flex-col gap-4 py-4">
            {links.map((link) => (
                <NavItem
                    key={link.name}
                    {...link}
                    isActive={router.location.pathname === link.href}
                />
            ))}
        </div>
    );
};
