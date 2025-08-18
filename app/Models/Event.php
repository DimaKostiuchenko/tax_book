<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Event
 *
 * Base event model for both tax payment and report events.
 */
class Event extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'event_type',
        'title',
        'description',
        'start_date',
        'end_date',
        'status',
    ];

    /**
     * Attribute type casting.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    /**
     * Event type constants.
     */
    public const TYPE_PAYMENT = 'payment';
    public const TYPE_REPORT = 'report';

    /**
     * Status constants.
     */
    public const STATUS_PENDING = 'pending';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_OVERDUE = 'overdue';

    /**
     * Owner of the event.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}


