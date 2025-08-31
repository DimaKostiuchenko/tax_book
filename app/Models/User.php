<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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
        'email_verification_token',
        'email_verification_token_expires_at',
        // Tax-related fields
        'user_type',
        'tin',
        'edrpou',
        'tax_regime',
        'vat_payer',
        'vat_number',
        'reporting_period',
        'phone',
        // Notification fields
        'telegram_connected',
        'telegram_chat_id',
        'viber_phone',
        'reminder_lead_time',
        // Preference fields
        'language',
        'theme',
        'timezone',
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
        'email_verification_token',
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
            'email_verification_token_expires_at' => 'datetime',
            'password' => 'hashed',
            'vat_payer' => 'boolean',
            'telegram_connected' => 'boolean',
            'reminder_lead_time' => 'array',
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
     * Mark the user's email as verified
     */
    public function markEmailAsVerified(): bool
    {
        return $this->forceFill([
            'email_verified_at' => $this->freshTimestamp(),
            'email_verification_token' => null,
            'email_verification_token_expires_at' => null,
        ])->save();
    }

    /**
     * Generate a new email verification token
     */
    public function generateEmailVerificationToken(): string
    {
        $token = Str::random(64);
        
        $this->forceFill([
            'email_verification_token' => $token,
            'email_verification_token_expires_at' => Carbon::now()->addHours(24),
        ])->save();

        return $token;
    }

    /**
     * Check if verification token is valid and not expired
     */
    public function isValidVerificationToken(string $token): bool
    {
        return $this->email_verification_token === $token &&
               $this->email_verification_token_expires_at &&
               $this->email_verification_token_expires_at->isFuture();
    }

    /**
     * Clear verification token
     */
    public function clearVerificationToken(): void
    {
        $this->forceFill([
            'email_verification_token' => null,
            'email_verification_token_expires_at' => null,
        ])->save();
    }

    /**
     * Check if user is FOP (Individual Entrepreneur)
     */
    public function isFOP(): bool
    {
        return $this->user_type === 'fop';
    }

    /**
     * Check if user is Legal Entity
     */
    public function isLegalEntity(): bool
    {
        return $this->user_type === 'legal_entity';
    }

    /**
     * Get user type display name
     */
    public function getUserTypeDisplayName(): string
    {
        return match($this->user_type) {
            'fop' => 'ФОП (Фізична особа-підприємець)',
            'legal_entity' => 'Юридична особа',
            default => 'Не вказано'
        };
    }

    /**
     * Get tax regime display name
     */
    public function getTaxRegimeDisplayName(): string
    {
        return match($this->tax_regime) {
            'single_tax_1' => 'Єдиний податок 1 група',
            'single_tax_2' => 'Єдиний податок 2 група',
            'single_tax_3' => 'Єдиний податок 3 група',
            'general_system' => 'Загальна система',
            default => 'Не вказано'
        };
    }

    /**
     * Get reporting period display name
     */
    public function getReportingPeriodDisplayName(): string
    {
        return match($this->reporting_period) {
            'monthly' => 'Щомісячно',
            'quarterly' => 'Щоквартально',
            'yearly' => 'Щорічно',
            default => 'Щомісячно'
        };
    }

    /**
     * Get language display name
     */
    public function getLanguageDisplayName(): string
    {
        return match($this->language) {
            'uk' => 'Українська',
            'en' => 'English',
            default => 'Українська'
        };
    }

    /**
     * Get theme display name
     */
    public function getThemeDisplayName(): string
    {
        return match($this->theme) {
            'light' => 'Світла',
            'dark' => 'Темна',
            'system' => 'Системна',
            default => 'Системна'
        };
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
