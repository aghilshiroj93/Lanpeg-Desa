<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class FileDesa extends Model
{
    use HasFactory;

    protected $table = 'file_desas';

    protected $fillable = [
        'judul',
        'slug',
        'kategori',
        'keterangan',
        'path_file',
        'tipe_file',
        'ukuran_file',
        'download_count',
        'status'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->judul) . '-' . Str::random(5);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('judul')) {
                $model->slug = Str::slug($model->judul) . '-' . Str::random(5);
            }
        });
    }
}
