<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get locale from URL parameter, session, or default to 'en'
        $locale = $request->get('locale') ?? Session::get('locale', 'en');
        
        // Validate locale
        $supportedLocales = ['en', 'uk'];
        if (!in_array($locale, $supportedLocales)) {
            $locale = 'en';
        }
        
        // Set application locale
        App::setLocale($locale);
        Session::put('locale', $locale);
        
        return $next($request);
    }
}
