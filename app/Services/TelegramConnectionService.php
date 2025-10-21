<?php

namespace App\Services;

use App\Models\User;
use App\Models\TelegramConnectionToken;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TelegramConnectionService
{
    /**
     * Generate a connection token for user
     */
    public function generateConnectionToken(User $user): string
    {
        // Clean up any existing tokens for this user
        $this->cleanUserTokens($user);

        $token = Str::uuid()->toString();
        $expiresAt = now()->addMinutes(10);

        TelegramConnectionToken::create([
            'user_id' => $user->id,
            'token' => $token,
            'expires_at' => $expiresAt,
        ]);

        Log::info('Telegram connection token generated', [
            'user_id' => $user->id,
            'token' => $token,
            'expires_at' => $expiresAt,
        ]);

        return $token;
    }

    /**
     * Generate deep link for Telegram bot
     */
    public function getDeepLink(string $token): string
    {
        $botUsername = config('services.telegram.bot_username') ?? 'your_bot_username';
        return "https://t.me/{$botUsername}?start={$token}";
    }

    /**
     * Verify connection token and connect user
     */
    public function verifyConnection(string $telegramUserId, string $token): bool
    {
        try {
            $connectionToken = TelegramConnectionToken::where('token', $token)
                ->where('expires_at', '>', now())
                ->whereNull('used_at')
                ->first();

            if (!$connectionToken) {
                Log::warning('Invalid or expired Telegram connection token', [
                    'token' => $token,
                    'telegram_user_id' => $telegramUserId,
                ]);
                return false;
            }

            // Mark token as used
            $connectionToken->update([
                'telegram_user_id' => $telegramUserId,
                'used_at' => now(),
            ]);

            // Update user's notification settings
            $user = $connectionToken->user;
            $user->notificationSettings()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'telegram_connected' => true,
                    'telegram_chat_id' => $telegramUserId,
                ]
            );

            Log::info('Telegram connection verified successfully', [
                'user_id' => $user->id,
                'telegram_user_id' => $telegramUserId,
                'token' => $token,
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to verify Telegram connection', [
                'token' => $token,
                'telegram_user_id' => $telegramUserId,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Disconnect user from Telegram
     */
    public function disconnectUser(User $user): bool
    {
        try {
            $user->notificationSettings()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'telegram_connected' => false,
                    'telegram_chat_id' => null,
                ]
            );

            // Clean up any pending tokens for this user
            $this->cleanUserTokens($user);

            Log::info('Telegram user disconnected', [
                'user_id' => $user->id,
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to disconnect Telegram user', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Clean up expired tokens
     */
    public function cleanExpiredTokens(): int
    {
        $deletedCount = TelegramConnectionToken::where('expires_at', '<', now())
            ->delete();

        if ($deletedCount > 0) {
            Log::info('Cleaned up expired Telegram connection tokens', [
                'deleted_count' => $deletedCount,
            ]);
        }

        return $deletedCount;
    }

    /**
     * Clean up tokens for specific user
     */
    private function cleanUserTokens(User $user): void
    {
        TelegramConnectionToken::where('user_id', $user->id)->delete();
    }

    /**
     * Get connection status for user
     */
    public function getConnectionStatus(User $user): array
    {
        $settings = $user->notificationSettings;
        
        return [
            'connected' => $settings?->telegram_connected ?? false,
            'chat_id' => $settings?->telegram_chat_id,
            'notifications_enabled' => $settings?->telegram_notifications ?? false,
        ];
    }

    /**
     * Check if user has valid connection
     */
    public function isUserConnected(User $user): bool
    {
        return $user->notificationSettings?->telegram_connected 
            && !empty($user->notificationSettings?->telegram_chat_id);
    }
}
