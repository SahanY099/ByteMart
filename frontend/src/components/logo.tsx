import { Link } from "@tanstack/react-router";

export const Logo = () => {
    return (
        <Link to="../">
            <div className="flex items-center gap-x-4 transition hover:opacity-75">
                <div className="block">
                    <p className="text-lg font-semibold">ByteMart</p>
                    <p className="text-sm text-muted-foreground">
                        Let&apos;s buy
                    </p>
                </div>
            </div>
        </Link>
    );
};
