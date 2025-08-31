<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserSettingsController extends Controller
{
    /**
     * Show the settings page.
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        return Inertia::render('settings', [
            'user' => $user->only([
                'name', 'email', 'user_type', 'tin', 'edrpou', 'tax_regime',
                'vat_payer', 'vat_number', 'reporting_period', 'phone',
                'telegram_connected', 'telegram_chat_id', 'viber_phone',
                'reminder_lead_time', 'language', 'theme', 'timezone'
            ])
        ]);
    }

    /**
     * Update profile settings.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'user_type' => ['required', Rule::in(['fop', 'legal_entity'])],
            'tin' => [
                'nullable',
                'string',
                'size:10',
                Rule::when($request->user_type === 'fop', ['required']),
            ],
            'edrpou' => [
                'nullable',
                'string',
                'size:8',
                Rule::when($request->user_type === 'legal_entity', ['required']),
            ],
            'tax_regime' => [
                'nullable',
                Rule::in(['single_tax_1', 'single_tax_2', 'single_tax_3', 'general_system']),
            ],
            'vat_payer' => 'boolean',
            'vat_number' => [
                'nullable',
                'string',
                Rule::when($request->vat_payer, ['required']),
            ],
            'reporting_period' => [
                'required',
                Rule::in(['monthly', 'quarterly', 'yearly']),
            ],
            'phone' => [
                'nullable',
                'string',
                'regex:/^\+380\d{9}$/',
            ],
        ], [
            'tin.required' => 'ТИН обов\'язковий для ФОП',
            'tin.size' => 'ТИН повинен містити 10 цифр',
            'edrpou.required' => 'ЄДРПОУ обов\'язковий для юридичної особи',
            'edrpou.size' => 'ЄДРПОУ повинен містити 8 цифр',
            'phone.regex' => 'Номер телефону повинен бути у форматі +380XXXXXXXXX',
            'vat_number.required' => 'ПДВ номер обов\'язковий для платників ПДВ',
        ]);

        $user->update($request->only([
            'user_type', 'tin', 'edrpou', 'tax_regime', 'vat_payer',
            'vat_number', 'reporting_period', 'phone'
        ]));

        return back()->with('success', 'Профіль успішно оновлено');
    }

    /**
     * Update notification settings.
     */
    public function updateNotifications(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'viber_phone' => [
                'nullable',
                'string',
                'regex:/^\+380\d{9}$/',
            ],
            'reminder_lead_time' => [
                'required',
                'array',
                'min:1',
            ],
            'reminder_lead_time.*' => [
                'integer',
                Rule::in([1, 3, 7]),
            ],
        ], [
            'viber_phone.regex' => 'Номер Viber повинен бути у форматі +380XXXXXXXXX',
            'reminder_lead_time.required' => 'Оберіть хоча б один період нагадування',
            'reminder_lead_time.min' => 'Оберіть хоча б один період нагадування',
        ]);

        $user->update($request->only([
            'viber_phone', 'reminder_lead_time'
        ]));

        return back()->with('success', 'Налаштування сповіщень оновлено');
    }

    /**
     * Update security settings (password change).
     */
    public function updateSecurity(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'current_password.required' => 'Введіть поточний пароль',
            'password.required' => 'Введіть новий пароль',
            'password.min' => 'Новий пароль повинен містити мінімум 8 символів',
            'password.confirmed' => 'Підтвердження пароля не співпадає',
        ]);

        // Check current password
        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors([
                'current_password' => 'Поточний пароль неправильний'
            ]);
        }

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        return back()->with('success', 'Пароль успішно змінено');
    }

    /**
     * Update site preferences.
     */
    public function updatePreferences(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'language' => ['required', Rule::in(['uk', 'en'])],
            'theme' => ['required', Rule::in(['light', 'dark', 'system'])],
            'timezone' => ['required', 'string', 'timezone'],
        ]);

        $user->update($request->only([
            'language', 'theme', 'timezone'
        ]));

        return back()->with('success', 'Налаштування збережено');
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

        return back()->with('success', 'Telegram бот підключено');
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

        return back()->with('success', 'Telegram бот відключено');
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
        
        return back()->with('success', "Тестове повідомлення відправлено через {$channel}");
    }
}
