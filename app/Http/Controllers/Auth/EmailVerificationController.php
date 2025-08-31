<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationController extends Controller
{
    /**
     * Show the email verification notice page.
     */
    public function show(): Response
    {
        return Inertia::render('auth/verify-email');
    }

    /**
     * Send verification email to the user.
     */
    public function sendVerificationEmail(Request $request)
    {
        $user = Auth::user();

        if ($user->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard'));
        }

        // Generate new verification token
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

        return back()->with('status', 'Письмо з підтвердженням відправлено на вашу email адресу.');
    }

    /**
     * Verify the user's email address.
     */
    public function verify(Request $request, string $token)
    {
        $user = User::where('email_verification_token', $token)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => 'Недійсне посилання для підтвердження email.',
            ]);
        }

        if (!$user->isValidVerificationToken($token)) {
            throw ValidationException::withMessages([
                'email' => 'Посилання для підтвердження email застаріло.',
            ]);
        }

        // Mark email as verified
        $user->markEmailAsVerified();

        // Log the user in if they're not already logged in
        if (!Auth::check()) {
            Auth::login($user);
        }

        return redirect()->route('dashboard')->with('status', 'Ваш email успішно підтверджено!');
    }

    /**
     * Resend verification email.
     */
    public function resend(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user->hasVerifiedEmail()) {
            return back()->with('status', 'Ваш email вже підтверджено.');
        }

        // Check if we should allow resend (rate limiting)
        if ($user->email_verification_token_expires_at && 
            $user->email_verification_token_expires_at->isFuture() &&
            $user->email_verification_token_expires_at->diffInMinutes(now()) < 5) {
            
            return back()->withErrors([
                'email' => 'Зачекайте 5 хвилин перед повторним відправленням листа.',
            ]);
        }

        // Generate new verification token
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

        return back()->with('status', 'Письмо з підтвердженням відправлено на вашу email адресу.');
    }
}
