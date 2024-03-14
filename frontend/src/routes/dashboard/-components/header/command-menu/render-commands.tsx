import { LucideIcon } from "lucide-react";
import { Fragment } from "react";

import {
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

import { useCommand } from "@/store/dashboard/command";

type Command = {
    type: "command";
    name: string;
    icon: LucideIcon;
    id: string;
    action: () => void;
};

type Group = {
    type: "group";
    heading: string;
    children: (Command | Group)[];
    separated?: boolean;
};

export type Commands = (Command | Group)[];

const RenderCommandItem = ({ id, name, icon: Icon, action }: Command) => {
    const { setOpen } = useCommand();

    return (
        <CommandItem
            onSelect={() => {
                setOpen(false);
                action();
            }}
            value={id}
        >
            <Icon className="mr-2 h-4 w-4" />
            {name}
        </CommandItem>
    );
};

const RenderCommandGroup = ({ heading, children, separated }: Group) => {
    return (
        <>
            {separated && <CommandSeparator />}
            <CommandGroup heading={heading}>
                <RenderCommands commands={children} />
            </CommandGroup>
        </>
    );
};

const RenderCommands = ({ commands }: { commands: Commands }) => (
    <>
        {commands.map((command, i) => (
            <Fragment key={i}>
                {command.type === "group" ? (
                    <RenderCommandGroup {...command} />
                ) : (
                    <RenderCommandItem {...command} />
                )}
            </Fragment>
        ))}
    </>
);

export const RenderCommandList = ({ commands }: { commands: Commands }) => (
    <CommandList>
        <RenderCommands commands={commands} />
    </CommandList>
);
