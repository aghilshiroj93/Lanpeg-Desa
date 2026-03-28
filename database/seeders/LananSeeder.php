<?php

namespace Database\Seeders;

use App\Models\Layanan;
use Illuminate\Database\Seeder;

class LayananSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Kartu Tanda Penduduk (KTP)',
                'icon' => 'CreditCard',
                'deskripsi' => 'Layanan permohonan Kartu Tanda Penduduk baru atau pembaruan data.',
                'persyaratan' => "1. Fotokopi Kartu Keluarga\n2. KTP lama (jika perpanjangan)\n3. Surat pengantar RT/RW",
                'prosedur' => 'Warga membawa berkas ke kantor desa, kemudian akan dilakukan verifikasi data sebelum diarahkan ke Disdukcapil.',
                'status' => 'aktif'
            ],
            [
                'nama' => 'Kartu Keluarga (KK)',
                'icon' => 'Users',
                'deskripsi' => 'Layanan pembuatan Kartu Keluarga baru, penambahan anggota, atau pecah KK.',
                'persyaratan' => "1. Surat pengantar RT/RW\n2. Buku Nikah/Akta Cerai\n3. Akta Kelahiran anggota baru",
                'prosedur' => 'Warga menyerahkan berkas ke bagian pelayanan desa untuk diproses draf KK baru.',
                'status' => 'aktif'
            ],
            [
                'nama' => 'Surat Keterangan Domisili',
                'icon' => 'FileCheck',
                'deskripsi' => 'Surat keterangan tempat tinggal bagi warga atau pelaku usaha di wilayah desa.',
                'persyaratan' => "1. KTP dan KK asli\n2. Surat pengantar RT/RW",
                'prosedur' => 'Langsung diproses di kantor desa (Selesai dalam 15 menit).',
                'status' => 'aktif'
            ],
            [
                'nama' => 'Surat Keterangan Usaha (SKU)',
                'icon' => 'Briefcase',
                'deskripsi' => 'Surat bukti kepemilikan usaha untuk keperluan perbankan atau legalitas lainnya.',
                'persyaratan' => "1. Fotokopi KTP dan KK\n2. Surat pengantar RT/RW\n3. Foto tempat usaha",
                'prosedur' => 'Petugas desa melakukan verifikasi lokasi usaha sebelum menerbitkan surat.',
                'status' => 'aktif'
            ]
        ];

        foreach ($data as $item) {
            Layanan::create($item);
        }
    }
}
