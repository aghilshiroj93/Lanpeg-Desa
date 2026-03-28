<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AgendaController extends Controller
{
    public function index()
    {
        return Inertia::render('Agenda/Index', [
            'agenda' => Agenda::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
            'lokasi' => 'nullable|string|max:255',
            'penanggung_jawab' => 'nullable|string|max:255',
            'poster_file' => 'nullable|image|max:2048',
            'status' => 'required|in:mendatang,berlangsung,selesai,batal'
        ]);

        if ($request->hasFile('poster_file')) {
            $path = $request->file('poster_file')->store('agenda', 'public');
            $validated['poster'] = $path;
        }

        Agenda::create($validated);

        return back()->with('success', 'Agenda berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $agenda = Agenda::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
            'lokasi' => 'nullable|string|max:255',
            'penanggung_jawab' => 'nullable|string|max:255',
            'poster_file' => 'nullable|image|max:2048',
            'status' => 'required|in:mendatang,berlangsung,selesai,batal'
        ]);

        if ($request->hasFile('poster_file')) {
            if ($agenda->poster) {
                Storage::disk('public')->delete($agenda->poster);
            }
            $path = $request->file('poster_file')->store('agenda', 'public');
            $validated['poster'] = $path;
        }

        $agenda->update($validated);

        return back()->with('success', 'Agenda berhasil diperbarui');
    }

    public function destroy($id)
    {
        $agenda = Agenda::findOrFail($id);
        if ($agenda->poster) {
            Storage::disk('public')->delete($agenda->poster);
        }
        $agenda->delete();

        return back()->with('success', 'Agenda berhasil dihapus');
    }
}
