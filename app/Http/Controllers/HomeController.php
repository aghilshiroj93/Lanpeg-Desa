<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Penduduk;
use App\Models\Agenda;
use App\Models\AparaturDesa;
use App\Models\VillageProfile;
use App\Models\VillageSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // 1. Stats
        $stats = [
            'total_penduduk' => Penduduk::count(),
            'laki_laki' => Penduduk::where('jenis_kelamin', 'L')->count(),
            'perempuan' => Penduduk::where('jenis_kelamin', 'P')->count(),
            'total_aparatur' => AparaturDesa::count(),
        ];

        // 2. Berita Terkini
        $beritas = Berita::latest()->take(3)->get();

        // 3. Agenda Mendatang
        $agendas = Agenda::where('tanggal_mulai', '>=', now())
            ->orderBy('tanggal_mulai', 'asc')
            ->take(3)
            ->get();

        // 4. Struktur Terpilih (Kades & Perangkat Utama)
        $aparatur = AparaturDesa::orderBy('urutan', 'asc')->take(4)->get();

        // 5. Settings (Contact/Maps/Social)
        $settings = VillageSetting::all()->pluck('value', 'key')->toArray();

        // 6. Profile Ringkas
        $profile = VillageProfile::where('slug', 'umum')->first();

        // 7. Top Services (Preview)
        $layanans = \App\Models\Layanan::where('status', 'aktif')->take(6)->get();

        return Inertia::render('Home', [
            'stats' => $stats,
            'beritas' => $beritas,
            'agendas' => $agendas,
            'aparatur' => $aparatur,
            'settings' => $settings,
            'profile' => $profile,
            'layanans' => $layanans
        ]);
    }

    public function services()
    {
        $layanans = \App\Models\Layanan::where('status', 'aktif')->get();
        return Inertia::render('Public/Layanan', [
            'layanans' => $layanans
        ]);
    }
}
