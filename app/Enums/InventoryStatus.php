<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static INACTIVE()
 * @method static static IN_STOCK()
 * @method static static OUT_OF_STOCKS()
 */
final class InventoryStatus extends Enum
{
    const INACTIVE = 0;
    const IN_STOCK = 1;
    const OUT_OF_STOCKS = 2;
}
