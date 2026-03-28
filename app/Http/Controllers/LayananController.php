<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LayananController extends Controller
{
    public function index()
    {
        return Inertia::render('Layanan/Index', [
            'layanan' => Layanan::orderBy('nama', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'persyaratan' => 'nullable|string',
            'prosedur' => 'nullable|string',
            'file_file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,zip|max:5120',
            'status' => 'required|in:aktif,tidak aktif'
        ]);

        if ($request->hasFile('file_file')) {
            $path = $request->file('file_file')->store('layanan', 'public');
            $validated['file_lampiran'] = $path;
        }

        Layanan::create($validated);

        return back()->with('success', 'Layanan berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $layanan = Layanan::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'persyaratan' => 'nullable|string',
            'prosedur' => 'nullable|string',
            'file_file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,zip|max:5120',
            'status' => 'required|in:aktif,tidak aktif'
        ]);

        if ($request->hasFile('file_file')) {
            if ($layanan->file_lampiran) {
                Storage::disk('public')->delete($layanan->file_lampiran);
            }
            $path = $request->file('file_file')->store('layanan', 'public');
            $validated['file_lampiran'] = $path;
        }

        $layanan->update($validated);

        return back()->with('success', 'Data layanan berhasil diperbarui');
    }

    public function destroy($id)
    {
        $layanan = Layanan::findOrFail($id);
        if ($layanan->file_lampiran) {
            Storage::disk('public')->delete($layanan->file_lampiran);
        }
        $layanan->delete();

        return back()->with('success', 'Layanan berhasil dihapus');
    }
}
