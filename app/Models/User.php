<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Carbon\Carbon;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'facebook_id',
        'google_token',
        'facebook_token',
        'google_refresh_token',
        'facebook_refresh_token',
        'avatar',
        'email_verified_at',
        // Keep social login fields, remove others that moved to separate tables
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google_token',
        'facebook_token',
        'google_refresh_token',
        'facebook_refresh_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Check if user has connected Google account
     */
    public function hasGoogleAccount(): bool
    {
        return !is_null($this->google_id);
    }

    /**
     * Check if user has connected Facebook account
     */
    public function hasFacebookAccount(): bool
    {
        return !is_null($this->facebook_id);
    }

    /**
     * Check if user's email is verified
     */
    public function hasVerifiedEmail(): bool
    {
        return !is_null($this->email_verified_at);
    }

    /**
     * Get the user's profile.
     */
    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
    }

    /**
     * Get the user's notification settings.
     */
    public function notificationSettings(): HasOne
    {
        return $this->hasOne(NotificationSettings::class);
    }

    /**
     * Get the user's preferences.
     */
    public function preferences(): HasOne
    {
        return $this->hasOne(UserPreferences::class);
    }

    /**
     * Get the user's settings audit logs.
     */
    public function settingsAuditLogs(): HasMany
    {
        return $this->hasMany(SettingsAuditLog::class);
    }

    // Backward compatibility accessors for profile data
    public function getUserTypeAttribute()
    {
        return $this->profile?->user_type;
    }

    public function getTinAttribute()
    {
        return $this->profile?->tin;
    }

    public function getEdrpouAttribute()
    {
        return $this->profile?->edrpou;
    }

    public function getTaxRegimeAttribute()
    {
        return $this->profile?->tax_regime;
    }

    public function getVatPayerAttribute()
    {
        return $this->profile?->vat_payer;
    }

    public function getVatNumberAttribute()
    {
        return $this->profile?->vat_number;
    }

    public function getReportingPeriodAttribute()
    {
        return $this->profile?->reporting_period;
    }

    public function getPhoneAttribute()
    {
        return $this->profile?->phone;
    }

    // Backward compatibility accessors for notification data
    public function getEmailNotificationsAttribute()
    {
        return $this->notificationSettings?->email_notifications;
    }

    public function getTelegramNotificationsAttribute()
    {
        return $this->notificationSettings?->telegram_notifications;
    }

    public function getViberNotificationsAttribute()
    {
        return $this->notificationSettings?->viber_notifications;
    }

    public function getTelegramConnectedAttribute()
    {
        return $this->notificationSettings?->telegram_connected;
    }

    public function getTelegramChatIdAttribute()
    {
        return $this->notificationSettings?->telegram_chat_id;
    }

    public function getViberPhoneAttribute()
    {
        return $this->notificationSettings?->viber_phone;
    }

    public function getReminderLeadTimeAttribute()
    {
        return $this->notificationSettings?->reminder_lead_time;
    }

    // Backward compatibility accessors for preferences data
    public function getLanguageAttribute()
    {
        return $this->preferences?->language;
    }

    public function getThemeAttribute()
    {
        return $this->preferences?->theme;
    }

    /**
     * Check if user is FOP (Individual Entrepreneur)
     */
    public function isFOP(): bool
    {
        return $this->profile?->isFOP() ?? false;
    }

    /**
     * Check if user is Legal Entity
     */
    public function isLegalEntity(): bool
    {
        return $this->profile?->isLegalEntity() ?? false;
    }

    /**
     * Get user type display name
     */
    public function getUserTypeDisplayName(): string
    {
        return $this->profile?->getUserTypeDisplayName() ?? 'Не вказано';
    }

    /**
     * Get tax regime display name
     */
    public function getTaxRegimeDisplayName(): string
    {
        return $this->profile?->getTaxRegimeDisplayName() ?? 'Не вказано';
    }

    /**
     * Get reporting period display name
     */
    public function getReportingPeriodDisplayName(): string
    {
        return $this->profile?->getReportingPeriodDisplayName() ?? 'Щомісячно';
    }

    /**
     * Get language display name
     */
    public function getLanguageDisplayName(): string
    {
        return $this->preferences?->getLanguageDisplayName() ?? 'Українська';
    }

    /**
     * Get theme display name
     */
    public function getThemeDisplayName(): string
    {
        return $this->preferences?->getThemeDisplayName() ?? 'Системна';
    }

    /**
     * Check if user has Telegram connected
     */
    public function hasTelegramConnected(): bool
    {
        return $this->notificationSettings?->hasTelegramConnected() ?? false;
    }

    /**
     * Check if user has Viber connected
     */
    public function hasViberConnected(): bool
    {
        return $this->notificationSettings?->hasViberConnected() ?? false;
    }

    /**
     * Get reminder lead time as array
     */
    public function getReminderLeadTime(): array
    {
        return $this->notificationSettings?->getReminderLeadTime() ?? [7, 3, 1];
    }
}
