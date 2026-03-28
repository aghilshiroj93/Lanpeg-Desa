<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use App\Models\Penduduk;
use App\Models\VillageProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class SuratController extends Controller
{
    public function index()
    {
        return Inertia::render('Surat/Index', [
            'surats' => Surat::with('penduduk')->latest()->get(),
            'penduduks' => Penduduk::orderBy('nama_lengkap')->get(['id', 'nik', 'nama_lengkap', 'dusun', 'rt', 'rw']),
            'village_profile' => VillageProfile::first()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'penduduk_id' => 'required|exists:penduduks,id',
            'jenis_surat' => 'required|string',
            'keperluan' => 'required|string',
            'nomor_surat' => 'required|string|unique:surats,nomor_surat',
            'tanggal_surat' => 'required|date'
        ]);

        Surat::create($validated);

        return back()->with('success', 'Surat berhasil diterbitkan');
    }

    public function destroy($id)
    {
        Surat::findOrFail($id)->delete();
        return back()->with('success', 'Arsip surat berhasil dihapus');
    }

    public function printPreview($id)
    {
        $surat = Surat::with('penduduk')->findOrFail($id);
        $profile = VillageProfile::first();
        
        // Return a view that can be printed by the browser
        return view('surat.template', compact('surat', 'profile'));
    }
}
