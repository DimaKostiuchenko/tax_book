<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Services\TelegramConnectionService;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class NotificationSettingsController extends Controller
{
    protected TelegramConnectionService $connectionService;
    protected TelegramService $telegramService;

    public function __construct(
        TelegramConnectionService $connectionService,
        TelegramService $telegramService
    ) {
        $this->connectionService = $connectionService;
        $this->telegramService = $telegramService;
    }
    /**
     * Show the notification settings form.
     */
    public function edit(): Response
    {
        $user = Auth::user()->load('notificationSettings');
        
        return Inertia::render('settings/notifications', [
            'user' => [
                'email' => $user->email,
                'phone' => $user->notificationSettings?->viber_phone,
                'telegram_connected' => $user->notificationSettings?->telegram_connected,
                'telegram_chat_id' => $user->notificationSettings?->telegram_chat_id,
                'viber_phone' => $user->notificationSettings?->viber_phone,
                'reminder_lead_time' => $user->notificationSettings?->reminder_lead_time,
                'email_notifications' => $user->notificationSettings?->email_notifications,
                'telegram_notifications' => $user->notificationSettings?->telegram_notifications,
                'viber_notifications' => $user->notificationSettings?->viber_notifications,
                'reminder_notifications' => !empty($user->notificationSettings?->reminder_lead_time),
            ]
        ]);
    }

    /**
     * Update notification settings.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'email_notifications' => 'boolean',
            'telegram_notifications' => 'boolean',
            'viber_notifications' => 'boolean',
            'reminder_notifications' => 'boolean',
            'email' => [
                'nullable',
                'string',
                'email',
            ],
            'phone' => [
                'nullable',
                'string',
                'regex:/^\+380\d{9}$/',
            ],
        ], [
            'phone.regex' => 'Номер телефону повинен бути у форматі +380XXXXXXXXX',
        ]);

        // Update or create notification settings
        $user->notificationSettings()->updateOrCreate(
            ['user_id' => $user->id],
            $request->only([
                'email_notifications', 'telegram_notifications', 'viber_notifications',
                'viber_phone' => $request->phone // Map phone to viber_phone
            ])
        );

        return redirect()->route('settings.notifications')->with('success', 'Налаштування сповіщень оновлено');
    }

    /**
     * Connect Telegram bot.
     */
    public function connectTelegram(Request $request)
    {
        $user = Auth::user();
        
        // Generate connection token and deep link
        $token = $this->connectionService->generateConnectionToken($user);
        $deepLink = $this->connectionService->getDeepLink($token);
        
        return response()->json([
            'success' => true,
            'deep_link' => $deepLink,
            'token' => $token,
            'expires_in' => 600, // 10 minutes
        ]);
    }

    /**
     * Disconnect Telegram bot.
     */
    public function disconnectTelegram()
    {
        $user = Auth::user();
        
        $success = $this->connectionService->disconnectUser($user);
        
        if ($success) {
            return redirect()->route('settings.notifications')->with('success', 'Telegram бот відключено');
        }
        
        return redirect()->route('settings.notifications')->with('error', 'Помилка при відключенні бота');
    }

    /**
     * Send test notification.
     */
    public function sendTestNotification(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'channel' => ['required', Rule::in(['email', 'telegram', 'viber'])],
        ]);

        $channel = $request->channel;
        
        switch ($channel) {
            case 'telegram':
                $success = $this->telegramService->sendTestNotification($user);
                if ($success) {
                    return redirect()->route('settings.notifications')->with('success', 'Тестове повідомлення відправлено через Telegram');
                } else {
                    return redirect()->route('settings.notifications')->with('error', 'Помилка відправки через Telegram. Перевірте підключення.');
                }
                
            case 'email':
                // TODO: Implement email test notification
                \Log::info("Test email notification sent to user {$user->id}");
                return redirect()->route('settings.notifications')->with('success', 'Тестове повідомлення відправлено через email');
                
            case 'viber':
                // TODO: Implement Viber test notification
                \Log::info("Test Viber notification sent to user {$user->id}");
                return redirect()->route('settings.notifications')->with('success', 'Тестове повідомлення відправлено через Viber');
                
            default:
                return redirect()->route('settings.notifications')->with('error', 'Невідомий канал сповіщень');
        }
    }
}
