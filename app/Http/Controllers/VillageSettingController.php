<?php

namespace App\Http\Controllers;

use App\Models\VillageSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VillageSettingController extends Controller
{
    public function index()
    {
        $settings = VillageSetting::all()->pluck('value', 'key')->toArray();
        return Inertia::render('Setting/Contact', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'group' => 'required|string'
        ]);

        foreach ($validated['settings'] as $key => $value) {
            VillageSetting::setByKey($key, $value, $validated['group']);
        }

        return back()->with('success', 'Pengaturan berhasil diperbarui');
    }
}
