import { useFormContext } from "react-hook-form";

import { ComboField } from "@/components/combo-field";
import { Hint } from "@/components/hint";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ChevronsUpDown, CopyPlus, Trash2 } from "lucide-react";

import { prepareForComboField } from "@/lib/prepare-for-combo-field";
import { Attribute, ProductData } from "@/types/products";

type InventoryProps = {
  index: number;
  isOpen: boolean;
  attributesData: Attribute[] | undefined;
  isAttributesLoading: boolean;
  handleOpenChange: (state: boolean, index: number) => void;
  handleInventoryCopy: (index: number) => void;
  handleInventoryRemove: (index: number) => void;
};

export const Inventory = ({
  index,
  isOpen,
  handleOpenChange,
  handleInventoryCopy,
  handleInventoryRemove,
  attributesData,
  isAttributesLoading,
}: InventoryProps) => {
  const form = useFormContext<ProductData>();

  const attributes = attributesData
    ? prepareForComboField(attributesData, "id", "name")
    : undefined;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(state) => handleOpenChange(state, index)}
      className="space-y-3"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full flex-row items-center justify-between"
          >
            <h4 className="text-sm font-semibold">Inventory #{index + 1}</h4>
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name={`inventories.${index}.isDefault`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormLabel>Default</FormLabel>
                <FormControl>
                  <Switch
                    className="space-y-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Hint label="Copy inventory" side="top" asChild>
            <Button
              size="icon"
              type="button"
              onClick={() => handleInventoryCopy(index)}
            >
              <CopyPlus className="h-4 w-4" />
            </Button>
          </Hint>
          <Hint label="Remove inventory" side="top" asChild>
            <Button
              size="icon"
              type="button"
              onClick={() => handleInventoryRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      </div>
      <CollapsibleContent className="space-y-2 px-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-4 md:flex-row">
            <FormField
              control={form.control}
              name={`inventories.${index}.price`}
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      min={1}
                      type="number"
                      placeholder="Enter a the price of the entry"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`inventories.${index}.quantity`}
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter a quantity of your product"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name={`inventories.${index}.price`}
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    min={1}
                    type="number"
                    placeholder="Enter a the price of the entry"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <InventoryAttributes
        inventoryIndex={index}
        data={data}
        isLoading={isLoading}
      /> */}

          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="inventories"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Select Attributes</FormLabel>
                  {form.formState.errors?.inventories &&
                    form.formState.errors?.inventories.message && (
                      <FormMessage />
                    )}
                </FormItem>
              )}
            />

            {isAttributesLoading ? (
              <LoadingButton loading>Please wait...</LoadingButton>
            ) : (
              <div className="flex flex-row flex-wrap gap-4">
                {attributes &&
                  attributes.map((attribute, attrIndex) => (
                    <div className="flex-1" key={attrIndex}>
                      <ComboField
                        options={prepareForComboField(
                          attributes[attrIndex].values!,
                          "id",
                          "value",
                        )}
                        label={attribute.label}
                        name={`inventories.${index}.attributes.${attrIndex}`}
                        placeholder={`Select ${attribute.label}`}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
