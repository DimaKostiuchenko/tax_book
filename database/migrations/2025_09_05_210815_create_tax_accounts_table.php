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
        Schema::create('tax_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tax_file_id')->constrained()->onDelete('cascade');
            $table->string('payment_code')->index();
            $table->string('iban')->index();
            $table->string('receiver');
            $table->text('purpose');
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['payment_code', 'iban']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tax_accounts');
    }
};
