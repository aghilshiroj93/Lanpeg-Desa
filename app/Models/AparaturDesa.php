<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AparaturDesa extends Model
{
    use HasFactory;

    protected $table = 'aparatur_desas';

    protected $fillable = [
        'nama',
        'jabatan',
        'nip',
        'foto',
        'urutan',
        'status',
        'deskripsi'
    ];
}
