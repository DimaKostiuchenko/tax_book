<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProfileSettingsController extends Controller
{
    /**
     * Show the profile settings form.
     */
    public function edit(): Response
    {
        $user = Auth::user()->load('profile');
        
        return Inertia::render('settings/profile', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'user_type' => $user->profile?->user_type,
                'tin' => $user->profile?->tin,
                'edrpou' => $user->profile?->edrpou,
                'tax_regime' => $user->profile?->tax_regime,
                'vat_payer' => $user->profile?->vat_payer,
                'vat_number' => $user->profile?->vat_number,
                'reporting_period' => $user->profile?->reporting_period,
                'phone' => $user->profile?->phone,
            ]
        ]);
    }

    /**
     * Update profile settings.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'user_type' => ['required', Rule::in(['fop', 'legal_entity'])],
            'tin' => [
                'nullable',
                'string',
                'size:10',
                Rule::when($request->user_type === 'fop', ['required']),
            ],
            'edrpou' => [
                'nullable',
                'string',
                'size:8',
                Rule::when($request->user_type === 'legal_entity', ['required']),
            ],
            'tax_regime' => [
                'nullable',
                Rule::in(['single_tax_1', 'single_tax_2', 'single_tax_3', 'general_system']),
            ],
            'vat_payer' => 'boolean',
            'vat_number' => [
                'nullable',
                'string',
                Rule::when($request->vat_payer, ['required']),
            ],
            'reporting_period' => [
                'required',
                Rule::in(['monthly', 'quarterly', 'yearly']),
            ],
            'phone' => [
                'nullable',
                'string',
                'regex:/^\+380\d{9}$/',
            ],
        ], [
            'tin.required' => 'ТИН обов\'язковий для ФОП',
            'tin.size' => 'ТИН повинен містити 10 цифр',
            'edrpou.required' => 'ЄДРПОУ обов\'язковий для юридичної особи',
            'edrpou.size' => 'ЄДРПОУ повинен містити 8 цифр',
            'phone.regex' => 'Номер телефону повинен бути у форматі +380XXXXXXXXX',
            'vat_number.required' => 'ПДВ номер обов\'язковий для платників ПДВ',
        ]);

        // Update or create profile
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $request->only([
                'user_type', 'tin', 'edrpou', 'tax_regime', 'vat_payer',
                'vat_number', 'reporting_period', 'phone'
            ])
        );

        return redirect()->route('settings.profile')->with('success', 'Профіль успішно оновлено');
    }
}
