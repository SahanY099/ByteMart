<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Products\Product;
use App\Http\Resources\Products\ProductResource;
use App\Http\Requests\Products\StoreProductRequest;

class ProductController extends Controller
{
    public function index()
    {
        //
    }

    public function store(StoreProductRequest $request)
    {
        $user_id = $request->user()->id;

        $validated = $request->validated();
        $inventory_data = $validated['inventories'];

        /**  @var Product $product */
        $product = Product::create([...$validated, "user_id" => $user_id]);
        $product->inventories()->createMany($inventory_data);

        return new ProductResource($product);
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
