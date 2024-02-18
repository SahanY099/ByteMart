<?php

namespace Database\Seeders;

use App\Models\Products\Attribute;
use App\Models\Products\AttributeValue;
use App\Models\Products\Inventory;
use App\Models\Products\Product;
use App\Models\Products\ProductImage;
use App\Models\Products\ProductType;
use Illuminate\Database\Seeder;

use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        /* 
        🔴🔴🔴🔴🔴
        
        create category seeder
        double check inventory attribute value function
        fine tune it
        
        🔴🔴🔴🔴🔴
         */


        ProductType::factory(2)->has(
            Attribute::factory()->count(5)->has(
                AttributeValue::factory()->count(2)
            )
        )->create();

        ProductType::factory(3)->has(
            Attribute::factory()->count(3)->has(
                AttributeValue::factory()->count(2)
            )
        )->create();

        ProductType::factory(5)->has(
            Attribute::factory()->count(2)->has(
                AttributeValue::factory()->count(3)
            )
        )->create();

        User::factory(7)
            ->has(
                Product::factory()->count(2)->has(
                    Inventory::factory()->count(5)->has(
                        ProductImage::factory()->count(2),
                        'images'
                    )
                )->has(
                        ProductImage::factory()->count(2),
                        'images'
                    )
            )
            ->create();

        User::factory(4)
            ->has(
                Product::factory()->count(6)->has(
                    Inventory::factory()->count(2)->has(
                        ProductImage::factory()->count(2),
                        'images'
                    )
                )->has(
                        ProductImage::factory()->count(4),
                        'images'
                    )
            )
            ->create();

        User::factory(20)
            ->has(
                Product::factory()->count(1)->has(
                    Inventory::factory()->count(1)->has(
                        ProductImage::factory()->count(3),
                        'images'
                    )
                )->has(
                        ProductImage::factory()->count(2),
                        'images'
                    )
            )
            ->create();

    }
}
