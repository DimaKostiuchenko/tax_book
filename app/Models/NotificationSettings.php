<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotificationSettings extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'email_notifications',
        'telegram_notifications',
        'viber_notifications',
        'telegram_connected',
        'telegram_chat_id',
        'viber_phone',
        'reminder_lead_time',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'email_notifications' => 'boolean',
            'telegram_notifications' => 'boolean',
            'viber_notifications' => 'boolean',
            'telegram_connected' => 'boolean',
            'reminder_lead_time' => 'array',
        ];
    }

    /**
     * Get the user that owns the notification settings.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if user has Telegram connected
     */
    public function hasTelegramConnected(): bool
    {
        return $this->telegram_connected && !is_null($this->telegram_chat_id);
    }

    /**
     * Check if user has Viber connected
     */
    public function hasViberConnected(): bool
    {
        return !is_null($this->viber_phone);
    }

    /**
     * Get reminder lead time as array
     */
    public function getReminderLeadTime(): array
    {
        return $this->reminder_lead_time ?? [7, 3, 1];
    }
}