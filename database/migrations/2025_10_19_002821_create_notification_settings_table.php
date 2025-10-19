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
        Schema::create('notification_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('email_notifications')->default(true);
            $table->boolean('telegram_notifications')->default(false);
            $table->boolean('viber_notifications')->default(false);
            $table->boolean('telegram_connected')->default(false);
            $table->string('telegram_chat_id')->nullable();
            $table->string('viber_phone')->nullable();
            $table->json('reminder_lead_time')->nullable()->comment('JSON array of reminder days [7, 3, 1]');
            $table->timestamps();

            // Ensure one notification settings per user
            $table->unique('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_settings');
    }
};