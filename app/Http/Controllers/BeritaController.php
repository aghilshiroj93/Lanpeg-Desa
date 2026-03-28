<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class BeritaController extends Controller
{
    public function index()
    {
        return Inertia::render('Berita/Index', [
            'berita' => Berita::with('user')->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string',
            'konten' => 'required|string',
            'thumbnail_file' => 'nullable|image|max:2048',
            'status' => 'required|in:draft,terbit'
        ]);

        $validated['user_id'] = Auth::id() ?? 1; // Fallback to 1 if not logged in (for testing)

        if ($request->hasFile('thumbnail_file')) {
            $path = $request->file('thumbnail_file')->store('berita', 'public');
            $validated['thumbnail'] = $path;
        }

        Berita::create($validated);

        return back()->with('success', 'Berita berhasil diterbitkan');
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string',
            'konten' => 'required|string',
            'thumbnail_file' => 'nullable|image|max:2048',
            'status' => 'required|in:draft,terbit'
        ]);

        if ($request->hasFile('thumbnail_file')) {
            if ($berita->thumbnail) {
                Storage::disk('public')->delete($berita->thumbnail);
            }
            $path = $request->file('thumbnail_file')->store('berita', 'public');
            $validated['thumbnail'] = $path;
        }

        $berita->update($validated);

        return back()->with('success', 'Berita berhasil diperbarui');
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        if ($berita->thumbnail) {
            Storage::disk('public')->delete($berita->thumbnail);
        }
        $berita->delete();

        return back()->with('success', 'Berita berhasil dihapus');
    }
}
