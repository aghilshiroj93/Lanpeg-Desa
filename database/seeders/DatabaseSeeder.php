<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Default Admin User
        \App\Models\User::factory()->create([
            'name' => 'Administrator Desa',
            'email' => 'admin@desa.id',
            'password' => bcrypt('admin123'),
        ]);

        $this->call([
            VillageProfileSeeder::class,
            AparaturDesaSeeder::class,
            LembagaSeeder::class,
            BeritaSeeder::class,
            GaleriSeeder::class,
            LayananSeeder::class,
            AgendaSeeder::class,
            FileDesaSeeder::class,
            PendudukSeeder::class,
        ]);
    }
}
