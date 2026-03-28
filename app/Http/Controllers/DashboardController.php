<?php

namespace App\Http\Controllers;

use App\Models\Penduduk;
use App\Models\AparaturDesa;
use App\Models\Agenda;
use App\Models\Surat;
use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Core Stats
        $stats = [
            'total_penduduk' => Penduduk::count(),
            'total_aparatur' => AparaturDesa::count(),
            'total_agenda' => Agenda::where('tanggal_mulai', '>=', now())->count(),
            'total_surat' => Surat::count(),
        ];

        // 2. Chart Data (Gender)
        $laki = Penduduk::where('jenis_kelamin', 'L')->count();
        $perem = Penduduk::where('jenis_kelamin', 'P')->count();
        $gender_stats = [
            ['name' => 'Laki-laki', 'value' => $laki],
            ['name' => 'Perempuan', 'value' => $perem],
        ];

        // 3. Chart Data (Status Penduduk)
        $status_stats = [
            ['name' => 'Tetap', 'count' => Penduduk::where('status_penduduk', 'tetap')->count()],
            ['name' => 'Pindah', 'count' => Penduduk::where('status_penduduk', 'pindah')->count()],
            ['name' => 'Meninggal', 'count' => Penduduk::where('status_penduduk', 'meninggal')->count()],
        ];

        // 4. Recent Activities
        $recent_surats = Surat::with('penduduk')->latest()->take(5)->get();
        $recent_beritas = Berita::latest()->take(5)->get();
        $upcoming_agendas = Agenda::where('tanggal_mulai', '>=', now())->orderBy('tanggal_mulai', 'asc')->take(5)->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'gender_stats' => $gender_stats,
            'status_stats' => $status_stats,
            'recent_surats' => $recent_surats,
            'recent_beritas' => $recent_beritas,
            'upcoming_agendas' => $upcoming_agendas
        ]);
    }
}
