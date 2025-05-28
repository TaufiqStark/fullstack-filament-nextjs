<?php
// admin-app/database/migrations/xxxx_xx_xx_xxxxxx_create_investments_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('investments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('risk_level'); // Contoh: Rendah, Sedang, Tinggi
            $table->decimal('min_investment', 15, 2);
            $table->string('potential_return'); // Contoh: '10-15% p.a.'
            $table->string('icon_svg')->nullable(); // Untuk menyimpan path atau nama ikon
            $table->boolean('is_featured')->default(false); // Untuk ditampilkan di homepage
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('investments');
    }
};
