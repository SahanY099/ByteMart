<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;

use App\Models\Products\Attribute;
use App\Models\Products\ProductType;

class InventoryAttributes implements ValidationRule, DataAwareRule
{
    /**
     * @var array<string, mixed>
     */
    protected $data = [];


    /**
     * @param  array<string, mixed>  $data
     */
    public function setData(array $data): static
    {
        $this->data = $data;

        return $this;
    }

    /**
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $productType = ProductType::findOrFail($this->data['product_type_id']);

        /**  @var Attribute[] $attributes */
        $attributes = $productType->attributes;

        /* Validates that the only one value is selected for a specific attribute */
        foreach ($attributes as &$attribute) {
            $attrValueCount = $attribute->attributeValues->whereIn('id', $value)->count();

            if ($attrValueCount > 1) {
                $fail('A attribute can only have one value.');
            }

        }
    }
}
