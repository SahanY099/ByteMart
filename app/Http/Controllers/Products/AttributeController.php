<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Resources\Attributes\AttributeResource;
use App\Models\Products\Attribute;
use App\Models\Products\ProductType;
use Illuminate\Http\Request;

class AttributeController extends Controller
{

    public function index(Request $request)
    {
        $type_id = $request->route('type');
        $attributes = ProductType::findOrFail($type_id)->attributes;

        return AttributeResource::collection($attributes);
    }


    public function store(Request $request)
    {
        //
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
