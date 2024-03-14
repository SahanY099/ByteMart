import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { useSidebar } from "@/store/dashboard/sidebar";

export const Toggle = () => {
    const { expand, collapse, collapsed: collapsed } = useSidebar();

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <div className="flex items-center justify-center">
            <Hint label={label} side="right" asChild>
                <Button
                    variant="ghost"
                    className="h-auto p-2"
                    onClick={collapsed ? expand : collapse}
                >
                    {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
                </Button>
            </Hint>
        </div>
    );
};
