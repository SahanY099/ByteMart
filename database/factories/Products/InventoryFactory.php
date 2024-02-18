<?php

namespace Database\Factories\Products;

use App\Models\Products\AttributeValue;
use App\Models\Products\Inventory;
use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Products\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products\Inventory>
 */
class InventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdAt = $this->faker->dateTimeThisYear();
        $updatedAt = $this->faker->dateTimeBetween($createdAt, 'now');

        return [
            'public_id' => $this->faker->unique()->randomNumber(9, true),
            'quantity' => $this->faker->randomNumber(2),
            'price' => $this->faker->randomFloat(2, 10, 2000),
            'status' => $this->faker->numberBetween(0, 2),
            'is_default' => $this->faker->boolean(20),
            'created_at' => $createdAt,
            'updated_at' => $updatedAt,

            'product_id' => Product::factory(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Inventory $inventory) {
            $attributes = $inventory->product->productType->attributes;

            for ($i = 0; $i < $attributes->count(); $i++) {
                $attribute_values = $attributes->all()[$i]->attributeValues;

                $inventory->attributeValues()->attach(
                    // $attribute_values->all()[$this->faker->numberBetween(1, $attribute_values->count() - 1)]->id
                    $attribute_values->random()->id
                );
            }
        });
    }
}
