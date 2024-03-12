<?php

namespace App\Http\Resources\Dashboard\Products;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'publicId' => $this->public_id,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'status' => $this->status,
            'isDefault ' => $this->is_default,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
