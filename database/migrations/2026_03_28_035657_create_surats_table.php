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
        Schema::create('surats', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_surat');
            $table->foreignId('penduduk_id')->constrained('penduduks')->onDelete('cascade');
            $table->string('jenis_surat'); // SKTM, Domisili, dll
            $table->text('keperluan')->nullable();
            $table->date('tanggal_surat');
            $table->string('status')->default('selesai');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surats');
    }
};
