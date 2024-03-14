import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAuthStore } from "@/store/auth";

type UserProfileProps = {
    greeting?: boolean;
};

export const UserProfile = ({ greeting = false }: UserProfileProps) => {
    const { user } = useAuthStore();

    return (
        <div className="flex flex-row items-center gap-4">
            {greeting && (
                <span className="font-medium">Hi, {user.firstName}</span>
            )}
            <Avatar className="">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    );
};
