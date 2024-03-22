<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;

use App\Rules\InventoryAttributes;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'inventories.*.is_default' => 'inventory is_default',
            'product_type_id' => 'productTypeId',
        ];
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'product_type_id' => 'required|exists:product_types,id',
            'inventories.*.quantity' => 'required|integer',
            'inventories.*.price' => 'required|integer',
            'inventories.*.is_default' => 'required|boolean',
            'inventories.*.attributes' => ['required', 'exists:attribute_values,id', new InventoryAttributes],
        ];
    }

    protected function prepareForValidation()
    {
        $inventories = $this->input('inventories', []);

        // loop through each inventory item
        foreach ($inventories as &$inventory) {
            // if isDefault key exists, rename it to is_default
            if (isset ($inventory['isDefault'])) {
                $inventory['is_default'] = $inventory['isDefault'];
                unset($inventory['isDefault']);
            }
        }

        $this->merge([
            'inventories' => $inventories,
            'product_type_id' => $this->productType,
        ]);
    }
}
