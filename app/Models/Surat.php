<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surat extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomor_surat',
        'penduduk_id',
        'jenis_surat',
        'keperluan',
        'tanggal_surat',
        'status'
    ];

    public function penduduk()
    {
        return $this->belongsTo(Penduduk::class);
    }
}
