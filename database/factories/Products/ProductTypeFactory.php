<?php

namespace Database\Factories\Products;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Products\ProductType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products\ProductType>
 */
class ProductTypeFactory extends Factory
{
    protected $model = ProductType::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $increment = 1;

        return [
            'name' => 'Product Type ' . $increment++
        ];
    }
}
