import { Link, ToPathOption } from "@tanstack/react-router";

type LogoProps = {
    to?: ToPathOption;
    className?: string;
};

export const Logo = ({ to = "/", className }: LogoProps) => {
    return (
        <Link to={to} className={className}>
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
