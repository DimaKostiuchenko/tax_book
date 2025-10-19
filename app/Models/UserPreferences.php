<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPreferences extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'language',
        'theme',
    ];

    /**
     * Get the user that owns the preferences.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
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
}