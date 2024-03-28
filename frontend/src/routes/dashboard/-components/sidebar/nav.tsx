import { useRouterState } from "@tanstack/react-router";
import { Inbox, Layers, MessagesSquare, Package, Wrench } from "lucide-react";
import { Fragment } from "react";

import { NavItem } from "./nav-item";

import { useAuthStore } from "@/store/auth";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Layers,
  },
  {
    name: "Products",
    href: "/dashboard/products",
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
  {
    name: "Product Types",
    href: "/dashboard/product-types",
    icon: Wrench,
    adminOnly: true,
  },
];

export const Nav = () => {
  const router = useRouterState();
  const { user } = useAuthStore();

  return (
    <div className="flex w-full flex-col gap-4 py-4">
      {links.map((link) => (
        <Fragment key={link.name}>
          {((link.adminOnly && user.isAdmin) || !link.adminOnly) && (
            <NavItem
              {...link}
              isActive={router.location.pathname === link.href}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
