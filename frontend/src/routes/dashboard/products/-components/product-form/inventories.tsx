import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PackagePlus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Inventory } from "@/routes/dashboard/products/-components/product-form/inventory";
import { useGetProductTypeAttributes } from "@/services/products";
import { ProductData } from "@/types/products";

export function Inventories() {
  const form = useFormContext<ProductData>();
  const attributesQuery = useGetProductTypeAttributes(
    form.getValues("productType"),
  );

  const inventoryArray = useFieldArray({
    control: form.control,
    name: "inventories",
  });

  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const [submitCount, setSubmitCount] = useState(0);
  const [productType, setProductType] = useState<{
    old: number | null;
    new: number | null;
  }>({
    old: null,
    new: null,
  });
  const [canAddEntries, setCanAddEntries] = useState(false);

  const inventories = inventoryArray.fields;

  const addInventory = () => {
    inventoryArray.append({
      isDefault: false,
      quantity: 0,
      price: 0,
      attributes: [],
    });
    handleOpenChange(true, inventoryArray.fields.length);
  };

  const removeInventory = (index: number) => {
    inventoryArray.remove(index);
  };

  const copyInventory = (index: number) => {
    const duplicate = { ...inventories[index], isDefault: false };

    inventoryArray.append(duplicate);
  };

  const handleOpenChange = (state: boolean, index: number) => {
    const isOpenUpdated = Array.from(
      { length: inventoryArray.fields.length },
      () => false,
    );
    isOpenUpdated[index] = state;

    setIsOpen(isOpenUpdated);
  };

  useEffect(() => {
    if (form.formState.submitCount > submitCount && !form.formState.isValid) {
      setSubmitCount(form.formState.submitCount);
      const errors = form.formState.errors["inventories"];

      if (Array.isArray(errors)) {
        const openState = errors.map((error) => error !== null);
        setIsOpen(openState);
      }
    }
  }, [form.formState, submitCount]);

  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.productType && data.productType != productType.new) {
        setProductType({
          old: productType.new,
          new: data.productType,
        });

        form.trigger("productType");
        const productTypeState = form.getFieldState("productType");

        if (!productTypeState.isDirty || !productTypeState.invalid) {
          setCanAddEntries(true);
        } else {
          setCanAddEntries(false);
        }
      }
    });

    if (productType.old != productType.new) {
      setProductType({
        old: productType.new,
        new: productType.new,
      });

      form.resetField("inventories");
      form.setValue("inventories", []);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [form, productType]);

  const canAddEntriesLabel = canAddEntries
    ? "Add new inventory"
    : "Please select type of your product first";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <FormField
          control={form.control}
          name="inventories"
          render={() => (
            <FormItem className="w-full">
              <FormLabel>Inventories</FormLabel>
              {form.formState.errors?.inventories &&
                form.formState.errors?.inventories.ref !== undefined && (
                  <FormMessage />
                )}
            </FormItem>
          )}
        />
        <Hint label={canAddEntriesLabel} side="left" asChild>
          <Button
            size="icon"
            type="button"
            onClick={!canAddEntries ? () => {} : addInventory}
            className={cn(!canAddEntries && "bg-muted-foreground opacity-50")}
          >
            <PackagePlus className="h-4 w-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex flex-col gap-4">
        {inventories.map((inventory, index) => (
          <Inventory
            key={inventory.id}
            index={index}
            isOpen={isOpen[index]}
            handleOpenChange={handleOpenChange}
            handleInventoryCopy={copyInventory}
            handleInventoryRemove={removeInventory}
            attributesData={attributesQuery.data}
            isAttributesLoading={attributesQuery.isLoading}
          />
        ))}
      </div>
    </div>
  );
}
