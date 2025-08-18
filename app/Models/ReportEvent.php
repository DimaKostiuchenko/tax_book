<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * ReportEvent holds details specific to tax/report submissions linked to an Event.
 */
class ReportEvent extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'event_id',
        'file_path',
        'submitted_at',
        'reference_no',
    ];

    /**
     * Attribute casts.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'submitted_at' => 'datetime',
    ];

    /**
     * Base event reference.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}


