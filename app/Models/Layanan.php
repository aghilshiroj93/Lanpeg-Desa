<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Layanan extends Model
{
    use HasFactory;

    protected $table = 'layanans';

    protected $fillable = [
        'nama',
        'slug',
        'icon',
        'deskripsi',
        'persyaratan',
        'prosedur',
        'file_lampiran',
        'status'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($layanan) {
            if (empty($layanan->slug)) {
                $layanan->slug = Str::slug($layanan->nama) . '-' . Str::random(5);
            }
        });

        static::updating(function ($layanan) {
            if ($layanan->isDirty('nama')) {
                $layanan->slug = Str::slug($layanan->nama) . '-' . Str::random(5);
            }
        });
    }
}
