<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class SecuritySettingsController extends Controller
{
    /**
     * Show the security settings form.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/security');
    }

    /**
     * Update security settings (password change).
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'current_password.required' => 'Введіть поточний пароль',
            'password.required' => 'Введіть новий пароль',
            'password.min' => 'Новий пароль повинен містити мінімум 8 символів',
            'password.confirmed' => 'Підтвердження пароля не співпадає',
        ]);

        // Check current password
        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors([
                'current_password' => 'Поточний пароль неправильний'
            ]);
        }

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        return redirect()->route('settings.security')->with('success', 'Пароль успішно змінено');
    }
}
