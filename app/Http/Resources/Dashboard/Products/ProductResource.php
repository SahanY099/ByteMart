<?php

namespace App\Http\Resources\Dashboard\Products;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $should_include_inventories = boolval($request->query('inventories', false));

        return [
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            $this->mergeWhen($should_include_inventories, [
                'inventories' => InventoryResource::collection($this->inventories),
            ]),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
