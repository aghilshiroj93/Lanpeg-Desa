<?php

namespace Database\Seeders;

use App\Models\AparaturDesa;
use Illuminate\Database\Seeder;

class AparaturDesaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'DRS. H. AHMAD JUNAEDI',
                'jabatan' => 'Kepala Desa',
                'nip' => '197505122005011002',
                'urutan' => 1,
                'status' => 'aktif',
                'deskripsi' => 'Menjabat sebagai Kepala Desa sejak periode 2021-2027.'
            ],
            [
                'nama' => 'SITI AMINAH, S.KOM',
                'jabatan' => 'Sekretaris Desa',
                'nip' => '198803152010122003',
                'urutan' => 2,
                'status' => 'aktif',
                'deskripsi' => 'Bertanggung jawab atas administrasi dan ketatausahaan desa.'
            ],
            [
                'nama' => 'BUDI SANTOSO',
                'jabatan' => 'Kaur Keuangan',
                'nip' => null,
                'urutan' => 3,
                'status' => 'aktif',
                'deskripsi' => 'Mengelola keuangan dan anggaran pendapatan desa.'
            ],
            [
                'nama' => 'RATNA SARI',
                'jabatan' => 'Kaur Perencanaan',
                'nip' => null,
                'urutan' => 4,
                'status' => 'aktif',
                'deskripsi' => 'Menyusun rencana pembangunan desa jangka pendek dan panjang.'
            ],
            [
                'nama' => 'AGUS CAHYONO',
                'jabatan' => 'Kepala Dusun I',
                'nip' => null,
                'urutan' => 5,
                'status' => 'aktif',
                'deskripsi' => 'Pemimpin wilayah di Dusun I.'
            ]
        ];

        foreach ($data as $item) {
            AparaturDesa::create($item);
        }
    }
}
