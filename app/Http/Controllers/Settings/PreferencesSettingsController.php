<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PreferencesSettingsController extends Controller
{
    /**
     * Show the preferences settings form.
     */
    public function edit(): Response
    {
        $user = Auth::user()->load('preferences');
        
        return Inertia::render('settings/preferences', [
            'user' => [
                'language' => $user->preferences?->language,
                'theme' => $user->preferences?->theme,
            ]
        ]);
    }

    /**
     * Update site preferences.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'language' => ['required', Rule::in(['uk', 'en'])],
            'theme' => ['required', Rule::in(['light', 'dark', 'system'])],
        ]);

        // Update or create preferences
        $user->preferences()->updateOrCreate(
            ['user_id' => $user->id],
            $request->only(['language', 'theme'])
        );

        return redirect()->route('settings.preferences')->with('success', 'Налаштування збережено');
    }
}
