<?php

namespace Database\Factories\Products;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Products\ProductType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products\Attribute>
 */
class AttributeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $increment = 1;

        return [
            'name' => 'Attribute ' . $increment++,
            'note' => '',

            'product_type_id' => ProductType::factory()
        ];
    }
}
