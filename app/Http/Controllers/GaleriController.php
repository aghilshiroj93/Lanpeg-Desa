<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GaleriController extends Controller
{
    public function index()
    {
        return Inertia::render('Galeri/Index', [
            'galeri' => Galeri::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'tipe' => 'required|in:foto,video',
            'kategori_album' => 'nullable|string',
            'keterangan' => 'nullable|string',
        ]);

        if ($request->tipe === 'foto') {
            $request->validate(['file_foto' => 'required|image|max:5120']); // Max 5MB for photos
            if ($request->hasFile('file_foto')) {
                $path = $request->file('file_foto')->store('galeri', 'public');
                $validated['file_atau_url'] = $path;
            }
        } else {
            $request->validate(['url_video' => 'required|url']);
            $validated['file_atau_url'] = $request->url_video;
        }

        Galeri::create($validated);

        return back()->with('success', 'Dokumentasi berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $galeri = Galeri::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'tipe' => 'required|in:foto,video',
            'kategori_album' => 'nullable|string',
            'keterangan' => 'nullable|string',
        ]);

        if ($request->tipe === 'foto') {
            if ($request->hasFile('file_foto')) {
                // Delete old file if it was a photo
                if ($galeri->tipe === 'foto' && $galeri->file_atau_url) {
                    Storage::disk('public')->delete($galeri->file_atau_url);
                }
                $path = $request->file('file_foto')->store('galeri', 'public');
                $validated['file_atau_url'] = $path;
            } else {
                $validated['file_atau_url'] = $galeri->file_atau_url;
            }
        } else {
            $request->validate(['url_video' => 'required|url']);
            $validated['file_atau_url'] = $request->url_video;
            
            // If previously was a photo, delete the file
            if ($galeri->tipe === 'foto' && $galeri->file_atau_url) {
                Storage::disk('public')->delete($galeri->file_atau_url);
            }
        }

        $galeri->update($validated);

        return back()->with('success', 'Data dokumentasi berhasil diperbarui');
    }

    public function destroy($id)
    {
        $galeri = Galeri::findOrFail($id);
        if ($galeri->tipe === 'foto' && $galeri->file_atau_url) {
            Storage::disk('public')->delete($galeri->file_atau_url);
        }
        $galeri->delete();

        return back()->with('success', 'Dokumentasi berhasil dihapus');
    }
}
