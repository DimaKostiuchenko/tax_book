<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserSettingsController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Settings page
    Route::get('settings', [UserSettingsController::class, 'index'])->name('settings');
    
    // Profile settings
    Route::post('settings/profile', [UserSettingsController::class, 'updateProfile'])->name('settings.profile');
    
    // Notification settings
    Route::post('settings/notifications', [UserSettingsController::class, 'updateNotifications'])->name('settings.notifications');
    Route::post('settings/connect-telegram', [UserSettingsController::class, 'connectTelegram'])->name('settings.connect-telegram');
    Route::post('settings/disconnect-telegram', [UserSettingsController::class, 'disconnectTelegram'])->name('settings.disconnect-telegram');
    Route::post('settings/test-notification', [UserSettingsController::class, 'sendTestNotification'])->name('settings.test-notification');
    
    // Security settings
    Route::post('settings/security', [UserSettingsController::class, 'updateSecurity'])->name('settings.security');
    
    // Preferences settings
    Route::post('settings/preferences', [UserSettingsController::class, 'updatePreferences'])->name('settings.preferences');
});
