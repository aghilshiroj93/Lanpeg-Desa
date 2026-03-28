<?php

namespace App\Http\Controllers;

use App\Models\Lembaga;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LembagaController extends Controller
{
    public function index()
    {
        return Inertia::render('Lembaga/Index', [
            'lembaga' => Lembaga::orderBy('urutan', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'singkatan' => 'nullable|string|max:50',
            'logo_file' => 'nullable|image|max:2048',
            'deskripsi' => 'nullable|string',
            'tugas_fungsi' => 'nullable|string',
            'kontak' => 'nullable|string|max:255',
            'urutan' => 'nullable|integer',
            'status' => 'required|in:aktif,tidak aktif'
        ]);

        if ($request->hasFile('logo_file')) {
            $path = $request->file('logo_file')->store('lembaga', 'public');
            $validated['logo'] = $path;
        }

        Lembaga::create($validated);

        return back()->with('success', 'Lembaga berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $lembaga = Lembaga::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'singkatan' => 'nullable|string|max:50',
            'logo_file' => 'nullable|image|max:2048',
            'deskripsi' => 'nullable|string',
            'tugas_fungsi' => 'nullable|string',
            'kontak' => 'nullable|string|max:255',
            'urutan' => 'nullable|integer',
            'status' => 'required|in:aktif,tidak aktif'
        ]);

        if ($request->hasFile('logo_file')) {
            if ($lembaga->logo) {
                Storage::disk('public')->delete($lembaga->logo);
            }
            $path = $request->file('logo_file')->store('lembaga', 'public');
            $validated['logo'] = $path;
        }

        $lembaga->update($validated);

        return back()->with('success', 'Data lembaga berhasil diperbarui');
    }

    public function destroy($id)
    {
        $lembaga = Lembaga::findOrFail($id);
        if ($lembaga->logo) {
            Storage::disk('public')->delete($lembaga->logo);
        }
        $lembaga->delete();

        return back()->with('success', 'Lembaga berhasil dihapus');
    }
}
