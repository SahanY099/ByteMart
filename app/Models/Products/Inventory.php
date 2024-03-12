<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use App\Enums\InventoryStatus;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'public_id',
        'quantity',
        'price',
        'is_default',
        'status',
        'product_id'
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($inventory) {

            $inventory->public_id = $inventory->generateUniquePublicId();

            $inventory->save();
        });
    }
    protected static function booted()
    {
        static::creating(function ($inventory) {
            $inventory->status = InventoryStatus::IN_STOCK;
        });
    }

    private function generateUniquePublicId(): string
    {
        $uniquePublicId = mt_rand(1000000000, 9999999999);

        while (self::where('public_id', $uniquePublicId)->exists()) {
            $uniquePublicId = mt_rand(1000000000, 9999999999);
        }

        return (string) $uniquePublicId;
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(ProductImage::class, 'imageable');
    }

    public function attributeValues(): BelongsToMany
    {
        return $this->belongsToMany(AttributeValue::class, 'inventory_attribute_value');
    }
}
