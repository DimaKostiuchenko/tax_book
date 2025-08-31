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
}
