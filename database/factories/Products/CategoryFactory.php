<?php

namespace Database\Factories\Products;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $increment = 1;
        $name = 'Category ' . $increment++;

        return [
            'name' => $name,
            'slug' => Str::slug($name)
        ];
    }
}
