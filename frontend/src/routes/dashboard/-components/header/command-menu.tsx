import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Blocks,
  BoxIcon,
  MoonIcon,
  PanelLeftClose,
  PanelLeftOpen,
  SunIcon,
  Wrench,
} from "lucide-react";
import { Commands, RenderCommandList } from "./render-commands";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useCommand } from "@/store/dashboard/command";
import { useSidebar } from "@/store/dashboard/sidebar";
import { useNavigate } from "@tanstack/react-router";

export function CommandMenu() {
  const navigate = useNavigate();
  const { open, setOpen } = useCommand();
  const { toggle, collapsed } = useSidebar();

  const { setTheme } = useTheme();

  const commands: Commands = [
    {
      type: "group",
      heading: "Suggestions",
      children: [
        {
          id: "suggestions-new-product",
          type: "command",
          name: "New Product",
          icon: Blocks,
          action: () => navigate({ to: "/dashboard/products/new" }),
        },
        {
          id: "suggestions-dark-theme",
          type: "command",
          name: "Dark Theme",
          icon: MoonIcon,
          action: () => setTheme("dark"),
        },
        {
          id: "suggestions-light-theme",
          type: "command",
          name: "Light Theme",
          icon: SunIcon,
          action: () => setTheme("light"),
        },
      ],
    },
    {
      type: "group",
      heading: "Products",
      separated: true,
      children: [
        {
          id: "listings-my-listings",
          type: "command",
          name: "My Products",
          icon: BoxIcon,
          action: () => {},
        },
        {
          id: "listings-new-listing",
          type: "command",
          name: "New Product",
          icon: Blocks,
          action: () => navigate({ to: "/dashboard/products/new" }),
        },
      ],
    },
    {
      type: "group",
      heading: "Other",
      separated: true,
      children: [
        {
          id: "other-manage-product-types",
          type: "command",
          name: "Manage Product Types",
          icon: Wrench,
          adminOnly: true,
          action: () => navigate({ to: "/dashboard/product-types" }),
        },
        {
          id: "other-dark-theme",
          type: "command",
          name: "Dark Theme",
          icon: MoonIcon,
          action: () => setTheme("dark"),
        },
        {
          id: "other-light-theme",
          type: "command",
          name: "Light Theme",
          icon: SunIcon,
          action: () => setTheme("light"),
        },
        {
          id: "other-toggle-sidebar",
          type: "command",
          name: collapsed ? "Open Sidebar" : "Close Sidebar",
          icon: collapsed ? PanelLeftOpen : PanelLeftClose,
          action: toggle,
        },
      ],
    },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative hidden h-8 w-full justify-start rounded-[0.5rem] bg-secondary text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:inline-flex lg:w-64",
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search Commands...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <RenderCommandList commands={commands} />
        </CommandList>
      </CommandDialog>
    </>
  );
}
