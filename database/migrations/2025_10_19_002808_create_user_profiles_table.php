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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('user_type', ['fop', 'legal_entity'])->nullable()->comment('Individual Entrepreneur or Legal Entity');
            $table->string('tin', 10)->nullable()->index()->comment('Tax Identification Number (10 digits for FOP)');
            $table->string('edrpou', 8)->nullable()->index()->comment('EDRPOU code (8 digits for Legal Entity)');
            $table->enum('tax_regime', ['single_tax_1', 'single_tax_2', 'single_tax_3', 'general_system'])->nullable();
            $table->boolean('vat_payer')->default(false);
            $table->string('vat_number')->nullable();
            $table->enum('reporting_period', ['monthly', 'quarterly', 'yearly'])->default('monthly');
            $table->string('phone')->nullable()->comment('Phone number in format +380XXXXXXXXX');
            $table->timestamps();

            // Ensure one profile per user
            $table->unique('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};