<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\Settings\ProfileSettingsController;
use App\Http\Controllers\Settings\NotificationSettingsController;
use App\Http\Controllers\Settings\SecuritySettingsController;
use App\Http\Controllers\Settings\PreferencesSettingsController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Settings overview page
    Route::get('settings', [SettingsController::class, 'index'])->name('settings');
    
    // Profile settings
    Route::get('settings/profile', [ProfileSettingsController::class, 'edit'])->name('settings.profile');
    Route::post('settings/profile', [ProfileSettingsController::class, 'update'])->name('settings.profile.update');
    
    // Notification settings
    Route::get('settings/notifications', [NotificationSettingsController::class, 'edit'])->name('settings.notifications');
    Route::post('settings/notifications', [NotificationSettingsController::class, 'update'])->name('settings.notifications.update');
    Route::post('settings/connect-telegram', [NotificationSettingsController::class, 'connectTelegram'])->name('settings.connect-telegram');
    Route::post('settings/disconnect-telegram', [NotificationSettingsController::class, 'disconnectTelegram'])->name('settings.disconnect-telegram');
    Route::post('settings/test-notification', [NotificationSettingsController::class, 'sendTestNotification'])->name('settings.test-notification');
    
    // Security settings
    Route::get('settings/security', [SecuritySettingsController::class, 'edit'])->name('settings.security');
    Route::post('settings/security', [SecuritySettingsController::class, 'update'])->name('settings.security.update');
    
    // Preferences settings
    Route::get('settings/preferences', [PreferencesSettingsController::class, 'edit'])->name('settings.preferences');
    Route::post('settings/preferences', [PreferencesSettingsController::class, 'update'])->name('settings.preferences.update');
});
