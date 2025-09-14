<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Arr;

class TaxFile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */

    protected $fillable = [
        'region',
        'file_url',
        'checksum',
        'local_path',
        'fetched_at',
        'page_url',
        'link_title',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'fetched_at' => 'datetime',
    ];

    /**
     * Get the tax accounts for this file.
     */
    public function taxAccounts(): HasMany
    {
        return $this->hasMany(TaxAccount::class);
    }

    /**
     * Scope a query to only include files for a specific region.
     */
    public function scopeForRegion($query, string $region)
    {
        return $query->where('region', $region);
    }

    /**
     * Scope a query to only include files fetched after a specific date.
     */
    public function scopeFetchedAfter($query, $date)
    {
        return $query->where('fetched_at', '>', $date);
    }
}
