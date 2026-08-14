<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clicks', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('short_link_id')->constrained('short_links')->cascadeOnDelete();
            $table->foreignId('link_destination_id')->constrained('link_destinations')->cascadeOnDelete();
            $table->timestamp('clicked_at')->useCurrent();
            $table->string('user_agent')->nullable();
            $table->string('ip_address')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clicks');
    }
};
