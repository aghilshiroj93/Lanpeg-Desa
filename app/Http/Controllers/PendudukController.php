<?php

namespace App\Http\Controllers;

use App\Models\Penduduk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Imports\PendudukImport;
use Maatwebsite\Excel\Facades\Excel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PendudukController extends Controller
{
    public function index()
    {
        $penduduk = Penduduk::orderBy('nama_lengkap', 'asc')->get();
        
        // Calculate statistics
        $stats = [
            'total' => $penduduk->count(),
            'laki_laki' => $penduduk->where('jenis_kelamin', 'L')->count(),
            'perempuan' => $penduduk->where('jenis_kelamin', 'P')->count(),
            'status_tetap' => $penduduk->where('status_penduduk', 'status_tetap')->count(),
        ];

        return Inertia::render('Penduduk/Index', [
            'penduduk' => $penduduk,
            'stats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|string|size:16|unique:penduduks,nik',
            'no_kk' => 'required|string|size:16',
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'dusun' => 'nullable|string',
            'rt' => 'nullable|string|max:3',
            'rw' => 'nullable|string|max:3',
            'agama' => 'nullable|string',
            'pendidikan_terakhir' => 'nullable|string',
            'pekerjaan' => 'nullable|string',
            'status_perkawinan' => 'nullable|string',
            'status_penduduk' => 'required|in:tetap,pindah,meninggal'
        ]);

        Penduduk::create($validated);

        return back()->with('success', 'Data penduduk berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $penduduk = Penduduk::findOrFail($id);

        $validated = $request->validate([
            'nik' => 'required|string|size:16|unique:penduduks,nik,' . $id,
            'no_kk' => 'required|string|size:16',
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'dusun' => 'nullable|string',
            'rt' => 'nullable|string|max:3',
            'rw' => 'nullable|string|max:3',
            'agama' => 'nullable|string',
            'pendidikan_terakhir' => 'nullable|string',
            'pekerjaan' => 'nullable|string',
            'status_perkawinan' => 'nullable|string',
            'status_penduduk' => 'required|in:tetap,pindah,meninggal'
        ]);

        $penduduk->update($validated);

        return back()->with('success', 'Data penduduk berhasil diperbarui');
    }

    public function destroy($id)
    {
        Penduduk::findOrFail($id)->delete();
        return back()->with('success', 'Data penduduk berhasil dihapus');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file_excel' => 'required|mimes:xlsx,xls,csv|max:10240'
        ]);

        Excel::import(new PendudukImport, $request->file('file_excel'));

        return back()->with('success', 'Data penduduk berhasil diimport');
    }

    public function getQrCode($nik)
    {
        // Generate QR code for a resident
        // In a real app, this might link to a public profile or verification page
        $data = "NIK: " . $nik . "\nSistem Informasi Desa Lanpeg";
        return QrCode::size(200)->generate($data);
    }
}
