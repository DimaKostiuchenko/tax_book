<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // Generate verification token
        $token = $user->generateEmailVerificationToken();

        // Send verification email
        Mail::send('emails.verify-email', [
            'user' => $user,
            'token' => $token,
            'verificationUrl' => route('verification.verify', ['token' => $token])
        ], function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Підтвердження email адреси - Tax Book');
        });

        // Log the user in but redirect to verification notice
        Auth::login($user);

        return redirect()->route('verification.notice')->with('status', 'Реєстрація успішна! Перевірте вашу email адресу для підтвердження.');
    }
}
