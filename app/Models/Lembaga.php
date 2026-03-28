<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lembaga extends Model
{
    use HasFactory;

    protected $table = 'lembagas';

    protected $fillable = [
        'nama',
        'singkatan',
        'logo',
        'deskripsi',
        'tugas_fungsi',
        'kontak',
        'urutan',
        'status'
    ];
}
