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
        Schema::table('tax_files', function (Blueprint $table) {
            $table->string('page_url');
            $table->string('link_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tax_files', function (Blueprint $table) {
            $table->dropColumn([
                'page_url',
                'link_title'
            ]);
        });
    }
};
