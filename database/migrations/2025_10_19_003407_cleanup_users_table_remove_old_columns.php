<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop unique index first
            $table->dropUnique(['email_verification_token']);
        });

        Schema::table('users', function (Blueprint $table) {
            // Remove unused email verification columns (Laravel uses signed URLs)
            $table->dropColumn([
                'email_verification_token',
                'email_verification_token_expires_at',
            ]);
            
            // Remove profile-related columns (moved to user_profiles table)
            $table->dropColumn([
                'user_type',
                'tin',
                'edrpou',
                'tax_regime',
                'vat_payer',
                'vat_number',
                'reporting_period',
                'phone',
            ]);
            
            // Remove notification-related columns (moved to notification_settings table)
            $table->dropColumn([
                'telegram_connected',
                'telegram_chat_id',
                'viber_phone',
                'reminder_lead_time',
            ]);
            
            // Remove preference-related columns (moved to user_preferences table)
            $table->dropColumn([
                'language',
                'theme',
                'timezone',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Email verification fields
            $table->string('email_verification_token')->nullable()->unique();
            $table->timestamp('email_verification_token_expires_at')->nullable();
            
            // Profile fields
            $table->enum('user_type', ['fop', 'legal_entity'])->nullable();
            $table->string('tin', 10)->nullable();
            $table->string('edrpou', 8)->nullable();
            $table->enum('tax_regime', ['single_tax_1', 'single_tax_2', 'single_tax_3', 'general_system'])->nullable();
            $table->boolean('vat_payer')->default(false);
            $table->string('vat_number')->nullable();
            $table->enum('reporting_period', ['monthly', 'quarterly', 'yearly'])->default('monthly');
            $table->string('phone')->nullable();
            
            // Notification fields
            $table->boolean('telegram_connected')->default(false);
            $table->string('telegram_chat_id')->nullable();
            $table->string('viber_phone')->nullable();
            $table->json('reminder_lead_time')->nullable();
            $table->boolean('email_notifications')->default(true);
            $table->boolean('telegram_notifications')->default(false);
            $table->boolean('viber_notifications')->default(false);
            $table->boolean('reminder_notifications')->default(true);
            
            // Preference fields
            $table->enum('language', ['uk', 'en'])->default('uk');
            $table->enum('theme', ['light', 'dark', 'system'])->default('system');
            $table->string('timezone')->default('Europe/Kyiv');
        });
    }
};