<?php

namespace App\Http\Controllers;

use App\Models\AparaturDesa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AparaturDesaController extends Controller
{
    public function index()
    {
        return Inertia::render('Struktur/Index', [
            'aparatur' => AparaturDesa::orderBy('urutan', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'nip' => 'nullable|string|max:255',
            'foto_file' => 'nullable|image|max:2048',
            'urutan' => 'nullable|integer',
            'status' => 'required|in:aktif,tidak aktif',
            'deskripsi' => 'nullable|string'
        ]);

        if ($request->hasFile('foto_file')) {
            $path = $request->file('foto_file')->store('aparatur', 'public');
            $validated['foto'] = $path;
        }

        AparaturDesa::create($validated);

        return back()->with('success', 'Aparatur berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $aparatur = AparaturDesa::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'nip' => 'nullable|string|max:255',
            'foto_file' => 'nullable|image|max:2048',
            'urutan' => 'nullable|integer',
            'status' => 'required|in:aktif,tidak aktif',
            'deskripsi' => 'nullable|string'
        ]);

        if ($request->hasFile('foto_file')) {
            if ($aparatur->foto) {
                Storage::delete('public/' . $aparatur->foto);
            }
            $path = $request->file('foto_file')->store('aparatur', 'public');
            $validated['foto'] = $path;
        }

        $aparatur->update($validated);

        return back()->with('success', 'Data aparatur berhasil diperbarui');
    }

    public function destroy($id)
    {
        $aparatur = AparaturDesa::findOrFail($id);
        if ($aparatur->foto) {
            Storage::delete('public/' . $aparatur->foto);
        }
        $aparatur->delete();

        return back()->with('success', 'Aparatur berhasil dihapus');
    }
}
