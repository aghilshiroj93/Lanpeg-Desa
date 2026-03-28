<?php

namespace Database\Seeders;

use App\Models\Galeri;
use Illuminate\Database\Seeder;

class GaleriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'judul' => 'Pembangunan Balai Pertemuan Dusun',
                'tipe' => 'video',
                'kategori_album' => 'Pembangunan',
                'file_atau_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Sample
                'keterangan' => 'Proses pembangunan balai pertemuan warga yang dimulai sejak awal tahun.'
            ],
            [
                'judul' => 'Dokumentasi HUT RI ke-78 Desa',
                'tipe' => 'video',
                'kategori_album' => 'Kegiatan Desa',
                'file_atau_url' => 'https://www.youtube.com/watch?v=ScMzIvxBSi4', // Sample
                'keterangan' => 'Keseruan lomba dan perayaan kemerdekaan di lapangan pusat desa.'
            ],
            [
                'judul' => 'Sosialisasi Program Pertanian Organik',
                'tipe' => 'video',
                'kategori_album' => 'Pemberdayaan',
                'file_atau_url' => 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
                'keterangan' => 'Pemerintah desa memberikan edukasi mengenai pupuk organik kepada para petani.'
            ]
        ];

        foreach ($data as $item) {
            Galeri::create($item);
        }
    }
}
