<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Migrate existing user data to new tables
        DB::transaction(function () {
            // Get all users with their current data
            $users = DB::table('users')->get();

            foreach ($users as $user) {
                // Create user profile
                DB::table('user_profiles')->insert([
                    'user_id' => $user->id,
                    'user_type' => $user->user_type,
                    'tin' => $user->tin,
                    'edrpou' => $user->edrpou,
                    'tax_regime' => $user->tax_regime,
                    'vat_payer' => $user->vat_payer ?? false,
                    'vat_number' => $user->vat_number,
                    'reporting_period' => $user->reporting_period ?? 'monthly',
                    'phone' => $user->phone,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Create notification settings
                DB::table('notification_settings')->insert([
                    'user_id' => $user->id,
                    'email_notifications' => $user->email_notifications ?? true,
                    'telegram_notifications' => $user->telegram_notifications ?? false,
                    'viber_notifications' => $user->viber_notifications ?? false,
                    'telegram_connected' => $user->telegram_connected ?? false,
                    'telegram_chat_id' => $user->telegram_chat_id,
                    'viber_phone' => $user->viber_phone,
                    'reminder_lead_time' => json_encode($user->reminder_lead_time ?? [7, 3, 1]),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Create user preferences
                DB::table('user_preferences')->insert([
                    'user_id' => $user->id,
                    'language' => $user->language ?? 'uk',
                    'theme' => $user->theme ?? 'system',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Clear the new tables
        DB::table('user_preferences')->truncate();
        DB::table('notification_settings')->truncate();
        DB::table('user_profiles')->truncate();
    }
};