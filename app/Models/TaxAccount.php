<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaxAccount extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'tax_file_id',
        'payment_code',
        'iban',
        'receiver',
        'purpose',
    ];

    /**
     * Get the tax file that owns this account.
     */
    public function taxFile(): BelongsTo
    {
        return $this->belongsTo(TaxFile::class);
    }

    /**
     * Scope a query to only include accounts with a specific payment code.
     */
    public function scopeWithPaymentCode($query, string $paymentCode)
    {
        return $query->where('payment_code', $paymentCode);
    }

    /**
     * Scope a query to only include accounts with a specific IBAN.
     */
    public function scopeWithIban($query, string $iban)
    {
        return $query->where('iban', $iban);
    }

    /**
     * Scope a query to only include accounts for a specific region.
     */
    public function scopeForRegion($query, string $region)
    {
        return $query->whereHas('taxFile', function ($q) use ($region) {
            $q->where('region', $region);
        });
    }
}
