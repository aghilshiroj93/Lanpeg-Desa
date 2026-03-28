<?php

namespace Database\Seeders;

use App\Models\Agenda;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class AgendaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'judul' => 'Rapat Pleno Bulanan Perangkat Desa',
                'deskripsi' => 'Evaluasi program kerja bulan lalu dan perencanaan program bulan depan.',
                'tanggal_mulai' => Carbon::now()->addDays(2)->setTime(9, 0),
                'tanggal_selesai' => Carbon::now()->addDays(2)->setTime(12, 0),
                'lokasi' => 'Aula Balai Desa',
                'penanggung_jawab' => 'Sekretaris Desa',
                'status' => 'mendatang'
            ],
            [
                'judul' => 'Kerja Bakti Massal Kebersihan Lingkungan',
                'deskripsi' => 'Seluruh warga diharapkan membawa peralatan masing-masing.',
                'tanggal_mulai' => Carbon::now()->addDays(5)->setTime(7, 0),
                'tanggal_selesai' => Carbon::now()->addDays(5)->setTime(10, 0),
                'lokasi' => 'Wilayah RT 01 - RT 05',
                'penanggung_jawab' => 'Kepala Dusun I',
                'status' => 'mendatang'
            ],
            [
                'judul' => 'Penyuluhan Kesehatan Ibu dan Anak (Posyandu)',
                'deskripsi' => 'Pemeriksaan rutin bayi dan balita serta pembagian makanan tambahan.',
                'tanggal_mulai' => Carbon::now()->subDays(1)->setTime(8, 0),
                'tanggal_selesai' => Carbon::now()->subDays(1)->setTime(11, 0),
                'lokasi' => 'Posyandu Mawar',
                'penanggung_jawab' => 'Ibu PKK',
                'status' => 'selesai'
            ],
            [
                'judul' => 'Pelatihan Pembuatan Website Desa',
                'deskripsi' => 'Pelatihan IT untuk admin desa dan perwakilan pemuda karang taruna.',
                'tanggal_mulai' => Carbon::now()->addDays(10)->setTime(13, 0),
                'tanggal_selesai' => Carbon::now()->addDays(10)->setTime(16, 0),
                'lokasi' => 'Ruang Laboratorium IT',
                'penanggung_jawab' => 'Tim IT Lanpeg',
                'status' => 'mendatang'
            ]
        ];

        foreach ($data as $item) {
            Agenda::create($item);
        }
    }
}
