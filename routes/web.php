<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AparaturDesaController;
use App\Http\Controllers\LembagaController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\FileDesaController;
use App\Http\Controllers\PendudukController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\VillageSettingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public Site
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/layanan', [HomeController::class, 'services'])->name('public.layanan');

// Authentication
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');

// Protected Admin Routes
Route::middleware('auth')->group(function () {
    
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Village Profile CRUD
    Route::prefix('profil')->group(function () {
        Route::get('/', [ProfileController::class, 'index'])->name('profile.index');
        Route::post('/', [ProfileController::class, 'store'])->name('profile.store');
        Route::post('/{id}', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/{id}', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Village Structure CRUD
    Route::prefix('struktur')->group(function () {
        Route::get('/', [AparaturDesaController::class, 'index'])->name('struktur.index');
        Route::post('/', [AparaturDesaController::class, 'store'])->name('struktur.store');
        Route::post('/{id}', [AparaturDesaController::class, 'update'])->name('struktur.update');
        Route::delete('/{id}', [AparaturDesaController::class, 'destroy'])->name('struktur.destroy');
    });

    // Village Institution CRUD
    Route::prefix('lembaga')->group(function () {
        Route::get('/', [LembagaController::class, 'index'])->name('lembaga.index');
        Route::post('/', [LembagaController::class, 'store'])->name('lembaga.store');
        Route::post('/{id}', [LembagaController::class, 'update'])->name('lembaga.update');
        Route::delete('/{id}', [LembagaController::class, 'destroy'])->name('lembaga.destroy');
    });

    // Village News/Kabar CRUD
    Route::prefix('berita')->group(function () {
        Route::get('/', [BeritaController::class, 'index'])->name('berita.index');
        Route::post('/', [BeritaController::class, 'store'])->name('berita.store');
        Route::post('/{id}', [BeritaController::class, 'update'])->name('berita.update');
        Route::delete('/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');
    });

    // Village Gallery & Documentation CRUD
    Route::prefix('galeri')->group(function () {
        Route::get('/', [GaleriController::class, 'index'])->name('galeri.index');
        Route::post('/', [GaleriController::class, 'store'])->name('galeri.store');
        Route::post('/{id}', [GaleriController::class, 'update'])->name('galeri.update');
        Route::delete('/{id}', [GaleriController::class, 'destroy'])->name('galeri.destroy');
    });

    // Village Services CRUD
    Route::prefix('layanan')->group(function () {
        Route::get('/', [LayananController::class, 'index'])->name('layanan.index');
        Route::post('/', [LayananController::class, 'store'])->name('layanan.store');
        Route::post('/{id}', [LayananController::class, 'update'])->name('layanan.update');
        Route::delete('/{id}', [LayananController::class, 'destroy'])->name('layanan.destroy');
    });

    // Village Agenda & Events CRUD
    Route::prefix('agenda')->group(function () {
        Route::get('/', [AgendaController::class, 'index'])->name('agenda.index');
        Route::post('/', [AgendaController::class, 'store'])->name('agenda.store');
        Route::post('/{id}', [AgendaController::class, 'update'])->name('agenda.update');
        Route::delete('/{id}', [AgendaController::class, 'destroy'])->name('agenda.destroy');
    });

    // Village Files & Documents CRUD
    Route::prefix('files')->group(function () {
        Route::get('/', [FileDesaController::class, 'index'])->name('files.index');
        Route::post('/', [FileDesaController::class, 'store'])->name('files.store');
        Route::post('/{id}', [FileDesaController::class, 'update'])->name('files.update');
        Route::delete('/{id}', [FileDesaController::class, 'destroy'])->name('files.destroy');
    });

    // Village Population Management CRUD
    Route::prefix('penduduk')->group(function () {
        Route::get('/', [PendudukController::class, 'index'])->name('penduduk.index');
        Route::post('/', [PendudukController::class, 'store'])->name('penduduk.store');
        Route::post('/{id}', [PendudukController::class, 'update'])->name('penduduk.update');
        Route::delete('/{id}', [PendudukController::class, 'destroy'])->name('penduduk.destroy');
        Route::post('/import', [PendudukController::class, 'import'])->name('penduduk.import');
    });

    // Automatic Correspondence (Surat Menyurat)
    Route::prefix('surat')->group(function () {
        Route::get('/', [SuratController::class, 'index'])->name('surat.index');
        Route::post('/', [SuratController::class, 'store'])->name('surat.store');
        Route::delete('/{id}', [SuratController::class, 'destroy'])->name('surat.destroy');
        Route::get('/print/{id}', [SuratController::class, 'printPreview'])->name('surat.print');
    });

    // Contact & Location Settings
    Route::prefix('kontak-lokasi')->group(function () {
        Route::get('/', [VillageSettingController::class, 'index'])->name('settings.contact');
        Route::post('/', [VillageSettingController::class, 'update'])->name('settings.update');
    });

    // Admin Account Management
    Route::prefix('akun')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('akun.index');
        Route::post('/', [UserController::class, 'store'])->name('akun.store');
        Route::post('/{id}', [UserController::class, 'update'])->name('akun.update');
        Route::delete('/{id}', [UserController::class, 'destroy'])->name('akun.destroy');
    });
});
