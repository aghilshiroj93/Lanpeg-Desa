<?php

namespace App\Http\Controllers;

use App\Models\VillageProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('Profile/Index', [
            'profiles' => VillageProfile::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image_file' => 'nullable|image|max:2048'
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        
        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('profiles', 'public');
            $validated['image'] = $path;
        }

        VillageProfile::create($validated);

        return back()->with('success', 'Profil berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $profile = VillageProfile::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image_file' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image_file')) {
            if ($profile->image) {
                Storage::delete('public/' . $profile->image);
            }
            $path = $request->file('image_file')->store('profiles', 'public');
            $validated['image'] = $path;
        }

        $profile->update($validated);

        return back()->with('success', 'Profil berhasil diperbarui');
    }

    public function destroy($id)
    {
        $profile = VillageProfile::findOrFail($id);
        if ($profile->image) {
            Storage::delete('public/' . $profile->image);
        }
        $profile->delete();

        return back()->with('success', 'Profil berhasil dihapus');
    }
}
