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
        Schema::create('tax_files', function (Blueprint $table) {
            $table->id();
            $table->string('region')->index();
            $table->string('file_url');
            $table->string('checksum')->index();
            $table->string('local_path');
            $table->timestamp('fetched_at');
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['region', 'fetched_at']);
            $table->unique(['region', 'checksum']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tax_files');
    }
};
