<?php

namespace Database\Seeders;

use App\Models\Lembaga;
use Illuminate\Database\Seeder;

class LembagaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Badan Permusyawaratan Desa',
                'singkatan' => 'BPD',
                'deskripsi' => 'Lembaga yang melaksanakan fungsi pemerintahan yang anggotanya merupakan wakil dari penduduk Desa berdasarkan keterwakilan wilayah dan ditetapkan secara demokratis.',
                'tugas_fungsi' => 'Membahas dan menyepakati Rancangan Peraturan Desa bersama Kepala Desa, Menampung dan menyalurkan aspirasi masyarakat Desa, dan Melakukan pengawasan kinerja Kepala Desa.',
                'urutan' => 1,
                'status' => 'aktif'
            ],
            [
                'nama' => 'Lembaga Pemberdayaan Masyarakat',
                'singkatan' => 'LPM',
                'deskripsi' => 'Lembaga yang dibentuk oleh masyarakat sesuai dengan kebutuhan dan merupakan mitra Pemerintah Desa dalam memberdayakan masyarakat.',
                'tugas_fungsi' => 'Menyusun rencana pembangunan secara partisipatif, menggerakkan swadaya gotong royong masyarakat, melaksanakan dan mengendalikan pembangunan.',
                'urutan' => 2,
                'status' => 'aktif'
            ],
            [
                'nama' => 'Pemberdayaan Kesejahteraan Keluarga',
                'singkatan' => 'PKK',
                'deskripsi' => 'Gerakan pembangunan masyarakat yang tumbuh dari bawah dengan wanita sebagai penggerak utamanya.',
                'tugas_fungsi' => 'Membina keluarga secara langsung dan tidak langsung untuk mewujudkan keluarga sejahtera melalui 10 program pokok PKK.',
                'urutan' => 3,
                'status' => 'aktif'
            ],
            [
                'nama' => 'Karang Taruna',
                'singkatan' => 'Karang Taruna',
                'deskripsi' => 'Wadah pengembangan generasi muda yang tumbuh dan berkembang atas dasar kesadaran dan tanggung jawab sosial dari, oleh dan untuk masyarakat.',
                'tugas_fungsi' => 'Mengembangkan bakat dan minat generasi muda, serta berperan aktif dalam penanganan masalah sosial di lingkungan desa.',
                'urutan' => 4,
                'status' => 'aktif'
            ],
            [
                'nama' => 'Pos Pelayanan Terpadu',
                'singkatan' => 'Posyandu',
                'deskripsi' => 'Wadah pemeliharaan kesehatan yang dilakukan dari, oleh, dan untuk masyarakat yang dibimbing petugas terkait.',
                'tugas_fungsi' => 'Memberikan pelayanan kesehatan dasar bagi ibu dan anak, pemantauan gizi, serta pendidikan kesehatan bagi masyarakat desa.',
                'urutan' => 5,
                'status' => 'aktif'
            ]
        ];

        foreach ($data as $item) {
            Lembaga::create($item);
        }
    }
}
