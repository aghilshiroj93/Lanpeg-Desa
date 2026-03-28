<?php

namespace Database\Seeders;

use App\Models\Berita;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::first() ?? User::factory()->create([
            'name' => 'Administrator Desa',
            'email' => 'admin@desa.id',
            'password' => bcrypt('admin123'),
        ]);

        $data = [
            [
                'judul' => 'Peresmian Jembatan Desa Baru untuk Memperlancar Ekonomi',
                'kategori' => 'Pembangunan',
                'konten' => 'Kepala Desa bersama warga meresmikan jembatan penghubung antar dusun yang diharapkan dapat mempercepat mobilitas hasil tani warga menuju pasar induk. Pembangunan ini menghabiskan waktu sekitar 3 bulan dengan anggaran swadaya dan dana desa.',
                'status' => 'terbit',
                'view_count' => 150,
            ],
            [
                'judul' => 'Kegiatan Posyandu Rutin di Balai Desa Bulan Maret',
                'kategori' => 'Kesehatan',
                'konten' => 'Telah dilaksanakan kegiatan Posyandu rutin dengan jumlah peserta mencatatkan rekor tertinggi. Selain pemeriksaan bayi, diadakan juga penyuluhan gizi bagi ibu hamil sebagai langkah pencegahan stunting di tingkat desa.',
                'status' => 'terbit',
                'view_count' => 85,
            ],
            [
                'judul' => 'Pelatihan Digital Marketing untuk UMKM Desa',
                'kategori' => 'Ekonomi',
                'konten' => 'Warga desa yang memiliki usaha kecil menengah (UMKM) mendapatkan pelatihan cara berjualan online dan teknik foto produk menggunakan smartphone. Hal ini bertujuan agar produk desa bisa menjangkau pasar nasional.',
                'status' => 'terbit',
                'view_count' => 210,
            ],
            [
                'judul' => 'Pengumuman Lomba Kebersihan Antar RT Menjelang Idul Fitri',
                'kategori' => 'Pengumuman',
                'konten' => 'Dalam rangka menyambut hari raya Idul Fitri, pemerintah desa mengadakan lomba kebersihan antar RT dengan total hadiah jutaan rupiah. Penilaian akan dilakukan meliputi aspek kebersihan, kerapihan, dan kreativitas taman.',
                'status' => 'terbit',
                'view_count' => 320,
            ],
            [
                'judul' => 'Rencana Penanaman Seribu Pohon di Jalur Hijau Desa',
                'kategori' => 'Warta Desa',
                'konten' => 'Pemerintah desa berencana melakukan penanaman seribu pohon untuk menjaga serapan air dan keindahan lingkungan. Warga diminta berpartisipasi dalam kegiatan kerja bakti akbar pada hari Minggu depan.',
                'status' => 'draft',
                'view_count' => 0,
            ]
        ];

        foreach ($data as $item) {
            $item['user_id'] = $admin->id;
            $item['slug'] = Str::slug($item['judul']) . '-' . Str::random(5);
            Berita::create($item);
        }
    }
}
