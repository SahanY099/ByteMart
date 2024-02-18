<?php

namespace Database\Factories\Products;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\Products\Product;
use App\Models\Products\ProductType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $increment = 1;
        $name = 'Product ' . $increment++;
        $slug = Str::slug($name);

        $createdAt = $this->faker->dateTimeThisYear();
        $updatedAt = $this->faker->dateTimeBetween($createdAt, 'now');

        return [
            'name' => $name,
            'slug' => $slug,
            'description' => fake()->text(600),
            'created_at' => $createdAt,
            'updated_at' => $updatedAt,

            'user_id' => User::factory(),
            'product_type_id' => ProductType::all()->random()->id
        ];
    }
}
