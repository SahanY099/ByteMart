import { Logo } from "@/components/logo";
import { Footer } from "./footer";
import { Nav } from "./nav";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

import { useSidebar } from "@/store/dashboard/sidebar";

export const Sidebar = () => {
    const { collapsed } = useSidebar();
    return (
        <Wrapper>
            <div className=" flex h-12 w-full flex-row items-center justify-center">
                {!collapsed && <Logo to="/dashboard" className="mr-auto" />}
                <Toggle />
            </div>
            <div className="flex-col justify-center lg:flex lg:h-full">
                <Nav />
            </div>
            <Footer />
        </Wrapper>
    );
};
