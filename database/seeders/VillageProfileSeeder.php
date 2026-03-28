<?php

namespace Database\Seeders;

use App\Models\VillageProfile;
use Illuminate\Database\Seeder;

class VillageProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $profiles = [
            [
                'slug' => 'umum',
                'title' => 'Informasi Umum',
                'description' => 'Ringkasan informasi umum tentang desa.',
                'content' => 'Selamat datang di halaman informasi umum desa kami. Di sini Anda akan menemukan deskripsi ringkas mengenai tata letak, demografi, dan gambaran singkat kehidupan sosial di desa.',
            ],
            [
                'slug' => 'sejarah',
                'title' => 'Sejarah Desa',
                'description' => 'Asal usul dan sejarah terbentuknya desa.',
                'content' => 'Desa ini didirikan pada tahun... Sang pendiri desa memulai pemukiman sederhana yang kini berkembang menjadi pusat perkonomian lokal...',
            ],
            [
                'slug' => 'visi-misi',
                'title' => 'Visi & Misi',
                'description' => 'Visi utama dan misi pembangunan desa.',
                'content' => 'Visi kami: Mewujudkan desa yang mandiri, sejahtera, dan religius melalui pemberdayaan potensi lokal yang berkelanjutan.',
            ],
        ];

        foreach ($profiles as $profile) {
            VillageProfile::updateOrCreate(['slug' => $profile['slug']], $profile);
        }
    }
}
