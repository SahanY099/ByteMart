import { ComboField } from "@/components/combo-field";

import { prepareForComboField } from "@/lib/prepare-for-combo-field";
import { useGetProductTypes } from "@/services/products";

export const ProductTypeField = () => {
  const { data, isLoading } = useGetProductTypes();

  return (
    <ComboField
      options={(!isLoading && prepareForComboField(data, "id", "name")) || []}
      loading={isLoading}
      name="productType"
      label="Product Type"
      placeholder="Select your product type"
    />
  );
};
