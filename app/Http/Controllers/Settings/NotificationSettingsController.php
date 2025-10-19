<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class NotificationSettingsController extends Controller
{
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
        
        // This is a placeholder for Telegram bot connection
        // In a real implementation, you would integrate with Telegram Bot API
        $user->update([
            'telegram_connected' => true,
            'telegram_chat_id' => 'test_chat_id_' . $user->id,
        ]);

        return redirect()->route('settings.notifications')->with('success', 'Telegram бот підключено');
    }

    /**
     * Disconnect Telegram bot.
     */
    public function disconnectTelegram()
    {
        $user = Auth::user();
        
        $user->update([
            'telegram_connected' => false,
            'telegram_chat_id' => null,
        ]);

        return redirect()->route('settings.notifications')->with('success', 'Telegram бот відключено');
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

        // This is a placeholder for test notification sending
        // In a real implementation, you would send actual notifications
        
        $channel = $request->channel;
        $message = "Тестове повідомлення від Tax Book";
        
        // Log the test notification for development
        \Log::info("Test notification sent to user {$user->id} via {$channel}: {$message}");
        
        return redirect()->route('settings.notifications')->with('success', "Тестове повідомлення відправлено через {$channel}");
    }
}
