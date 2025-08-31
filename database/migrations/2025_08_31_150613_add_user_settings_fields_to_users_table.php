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
            // Tax-related fields
            $table->enum('user_type', ['fop', 'legal_entity'])->nullable()->comment('Individual Entrepreneur or Legal Entity');
            $table->string('tin', 10)->nullable()->comment('Tax Identification Number (10 digits for FOP)');
            $table->string('edrpou', 8)->nullable()->comment('EDRPOU code (8 digits for Legal Entity)');
            $table->enum('tax_regime', ['single_tax_1', 'single_tax_2', 'single_tax_3', 'general_system'])->nullable();
            $table->boolean('vat_payer')->default(false);
            $table->string('vat_number')->nullable();
            $table->enum('reporting_period', ['monthly', 'quarterly', 'yearly'])->default('monthly');
            $table->string('phone')->nullable()->comment('Phone number in format +380XXXXXXXXX');
            
            // Notification fields
            $table->boolean('telegram_connected')->default(false);
            $table->string('telegram_chat_id')->nullable();
            $table->string('viber_phone')->nullable();
            $table->json('reminder_lead_time')->nullable()->comment('JSON array of reminder days [7, 3, 1]');
            
            // Preference fields
            $table->enum('language', ['uk', 'en'])->default('uk');
            $table->enum('theme', ['light', 'dark', 'system'])->default('system');
            $table->string('timezone')->default('Europe/Kyiv');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'user_type',
                'tin',
                'edrpou',
                'tax_regime',
                'vat_payer',
                'vat_number',
                'reporting_period',
                'phone',
                'telegram_connected',
                'telegram_chat_id',
                'viber_phone',
                'reminder_lead_time',
                'language',
                'theme',
                'timezone'
            ]);
        });
    }
};
