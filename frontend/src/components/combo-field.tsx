import { Fragment, useRef, useState } from "react";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

import { LoadingButton } from "@/components/loading-button";
import { cn } from "@/lib/utils";

export type ComboFieldOption<SType extends FieldValues> = {
  label: string;
  value: PathValue<SType, Path<SType>>;
};

type ComboFieldProps<SType extends FieldValues> = {
  name: Path<SType>;
  label: string;
  placeholder: string;
  options: ComboFieldOption<SType>[];
  loading?: boolean;
};

export const ComboField = <SType extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  loading: isLoading = false,
}: ComboFieldProps<SType>) => {
  const form = useFormContext<SType>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* if (isLoading) {
    return 
  } */

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <LoadingButton
                  ref={buttonRef}
                  variant="outline"
                  role="combobox"
                  loading={isLoading}
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {!isLoading && value
                    ? options.find((option) => option.value === value)?.label
                    : placeholder}
                  {!isLoading && (
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  )}
                </LoadingButton>
              </FormControl>
            </PopoverTrigger>
            <FormMessage />

            {!isLoading && (
              <PopoverContent
                className="min-w-[200px] p-0"
                style={{
                  width: buttonRef.current?.clientWidth + "px",
                }}
              >
                <Command>
                  <CommandInput
                    placeholder="Search resource group..."
                    className="h-9"
                  />
                  <CommandEmpty>No resource group found.</CommandEmpty>

                  <CommandList>
                    <CommandGroup>
                      {options.map((option) => (
                        <Fragment key={option.value}>
                          <CommandItem
                            onSelect={() => {
                              form.setValue(name, option.value, {
                                shouldValidate: true,
                              });
                              setValue(option.value);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === option.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        </Fragment>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            )}
          </Popover>
        </FormItem>
      )}
    />
  );
};
