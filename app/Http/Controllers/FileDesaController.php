<?php

namespace App\Http\Controllers;

use App\Models\FileDesa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileDesaController extends Controller
{
    public function index()
    {
        return Inertia::render('File/Index', [
            'files' => FileDesa::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string',
            'keterangan' => 'nullable|string',
            'file_file' => 'required|file|max:10240', // Max 10MB
            'status' => 'required|in:publik,draft'
        ]);

        if ($request->hasFile('file_file')) {
            $file = $request->file('file_file');
            $path = $file->store('dokumen', 'public');
            
            $validated['path_file'] = $path;
            $validated['tipe_file'] = $file->getClientOriginalExtension();
            $validated['ukuran_file'] = $this->formatSize($file->getSize());
        }

        FileDesa::create($validated);

        return back()->with('success', 'File berhasil diunggah');
    }

    public function update(Request $request, $id)
    {
        $fileModel = FileDesa::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string',
            'keterangan' => 'nullable|string',
            'file_file' => 'nullable|file|max:10240',
            'status' => 'required|in:publik,draft'
        ]);

        if ($request->hasFile('file_file')) {
            // Delete old file
            if ($fileModel->path_file) {
                Storage::disk('public')->delete($fileModel->path_file);
            }
            
            $file = $request->file('file_file');
            $path = $file->store('dokumen', 'public');
            
            $validated['path_file'] = $path;
            $validated['tipe_file'] = $file->getClientOriginalExtension();
            $validated['ukuran_file'] = $this->formatSize($file->getSize());
        }

        $fileModel->update($validated);

        return back()->with('success', 'Data file berhasil diperbarui');
    }

    public function destroy($id)
    {
        $fileModel = FileDesa::findOrFail($id);
        if ($fileModel->path_file) {
            Storage::disk('public')->delete($fileModel->path_file);
        }
        $fileModel->delete();

        return back()->with('success', 'File berhasil dihapus');
    }

    public function download($id)
    {
        $fileModel = FileDesa::findOrFail($id);
        $fileModel->increment('download_count');
        
        return Storage::disk('public')->download($fileModel->path_file, $fileModel->judul . '.' . $fileModel->tipe_file);
    }

    private function formatSize($bytes)
    {
        if ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        } else {
            return $bytes . ' bytes';
        }
    }
}
