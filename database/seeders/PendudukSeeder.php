<?php

namespace Database\Seeders;

use App\Models\Penduduk;
use Illuminate\Database\Seeder;

class PendudukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nik' => '7371010101010001',
                'no_kk' => '7371010101010000',
                'nama_lengkap' => 'AHMAD RIFAI',
                'tempat_lahir' => 'Makassar',
                'tanggal_lahir' => '1985-05-12',
                'jenis_kelamin' => 'L',
                'dusun' => 'Dusun I',
                'rt' => '001',
                'rw' => '001',
                'agama' => 'Islam',
                'pendidikan_terakhir' => 'S1',
                'pekerjaan' => 'Wiraswasta',
                'status_perkawinan' => 'Kawin',
                'status_penduduk' => 'tetap'
            ],
            [
                'nik' => '7371010101010002',
                'no_kk' => '7371010101010000',
                'nama_lengkap' => 'SITI AMINAH',
                'tempat_lahir' => 'Gowa',
                'tanggal_lahir' => '1988-10-20',
                'jenis_kelamin' => 'P',
                'dusun' => 'Dusun I',
                'rt' => '001',
                'rw' => '001',
                'agama' => 'Islam',
                'pendidikan_terakhir' => 'SMA',
                'pekerjaan' => 'IRT',
                'status_perkawinan' => 'Kawin',
                'status_penduduk' => 'tetap'
            ],
            [
                'nik' => '7371010101010003',
                'no_kk' => '7371010202020000',
                'nama_lengkap' => 'BUDI SANTOSO',
                'tempat_lahir' => 'Surabaya',
                'tanggal_lahir' => '1995-02-15',
                'jenis_kelamin' => 'L',
                'dusun' => 'Dusun II',
                'rt' => '003',
                'rw' => '002',
                'agama' => 'Kristen',
                'pendidikan_terakhir' => 'D3',
                'pekerjaan' => 'Karyawan Swasta',
                'status_perkawinan' => 'Belum Kawin',
                'status_penduduk' => 'tetap'
            ],
            [
                'nik' => '7371010101010004',
                'no_kk' => '7371010303030000',
                'nama_lengkap' => 'DIANA PUTRI',
                'tempat_lahir' => 'Semarang',
                'tanggal_lahir' => '2000-12-01',
                'jenis_kelamin' => 'P',
                'dusun' => 'Dusun III',
                'rt' => '005',
                'rw' => '001',
                'agama' => 'Islam',
                'pendidikan_terakhir' => 'SMA',
                'pekerjaan' => 'Pelajar/Mahasiswa',
                'status_perkawinan' => 'Belum Kawin',
                'status_penduduk' => 'tetap'
            ]
        ];

        foreach ($data as $item) {
            Penduduk::create($item);
        }
    }
}
