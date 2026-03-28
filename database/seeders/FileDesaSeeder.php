<?php

namespace Database\Seeders;

use App\Models\FileDesa;
use Illuminate\Database\Seeder;

class FileDesaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'judul' => 'Peraturan Desa No 2 Tahun 2024 tentang Anggaran Pendapatan dan Belanja Desa',
                'kategori' => 'Peraturan Desa',
                'keterangan' => 'Dokumen resmi APBDes tahun anggaran 2024.',
                'path_file' => 'dokumen/sample-apbdes.pdf',
                'tipe_file' => 'pdf',
                'ukuran_file' => '2.5 MB',
                'download_count' => 124,
                'status' => 'publik'
            ],
            [
                'judul' => 'Formulir Permohonan Surat Keterangan Tidak Mampu (SKTM)',
                'kategori' => 'Formulir Luayanan',
                'keterangan' => 'Silakan unduh dan cetak formulir ini sebelum dibawa ke kantor desa.',
                'path_file' => 'dokumen/form-sktm.docx',
                'tipe_file' => 'docx',
                'ukuran_file' => '450 KB',
                'download_count' => 89,
                'status' => 'publik'
            ],
            [
                'judul' => 'Laporan Realisasi Dana Desa Tahap I Tahun 2023',
                'kategori' => 'Laporan Keuangan',
                'keterangan' => 'Laporan pertanggungjawaban penggunaan dana desa tahap satu.',
                'path_file' => 'dokumen/laporan-dd-tahap1.xlsx',
                'tipe_file' => 'xlsx',
                'ukuran_file' => '1.2 MB',
                'download_count' => 45,
                'status' => 'publik'
            ],
            [
                'judul' => 'Visi dan Misi Strategis Desa 2024-2029',
                'kategori' => 'Pengumuman',
                'keterangan' => 'Rencana jangka menengah pembangunan desa.',
                'path_file' => 'dokumen/visi-misi.pdf',
                'tipe_file' => 'pdf',
                'ukuran_file' => '3.8 MB',
                'download_count' => 230,
                'status' => 'publik'
            ],
            [
                'judul' => 'Draf Rencana Pembangunan Jangka Panjang Desa',
                'kategori' => 'Lainnya',
                'keterangan' => 'Masih dalam tahap tinjauan internal.',
                'path_file' => 'dokumen/draf-rpjp.pdf',
                'tipe_file' => 'pdf',
                'ukuran_file' => '5.1 MB',
                'download_count' => 0,
                'status' => 'draft'
            ]
        ];

        foreach ($data as $item) {
            FileDesa::create($item);
        }
    }
}
