<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'user_type',
        'tin',
        'edrpou',
        'tax_regime',
        'vat_payer',
        'vat_number',
        'reporting_period',
        'phone',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'vat_payer' => 'boolean',
        ];
    }

    /**
     * Get the user that owns the profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
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
}