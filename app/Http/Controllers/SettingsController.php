<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Show the settings overview page.
     */
    public function index(): Response
    {
        return Inertia::render('settings/index');
    }
}
