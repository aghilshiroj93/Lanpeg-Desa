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
        Schema::create('file_desas', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('slug')->unique();
            $table->string('kategori'); // Perdes, Perkades, Laporan, Formulir, dll
            $table->text('keterangan')->nullable();
            $table->string('path_file');
            $table->string('tipe_file'); // pdf, doc, xls, dll
            $table->string('ukuran_file')->nullable();
            $table->integer('download_count')->default(0);
            $table->enum('status', ['publik', 'draft'])->default('publik');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_desas');
    }
};
