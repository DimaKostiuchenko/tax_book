<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventsController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Events listing and details
    Route::get('events', [EventsController::class, 'index'])->name('events.index');
    Route::get('events/{event}', [EventsController::class, 'show'])->name('events.show');

    // Client Management (now requires authentication)
    Route::get('client-management', function () {
        return Inertia::render('client-management');
    })->name('client-management');
});

// Layout examples (no auth required)
Route::get('example-layout', function () {
    return Inertia::render('example-layout');
})->name('example-layout');

Route::get('inbox-layout', function () {
    return Inertia::render('inbox-layout');
})->name('inbox-layout');

Route::get('test-localization', function () {
    return Inertia::render('test-localization');
})->name('test-localization');

Route::get('logo-demo', function () {
    return Inertia::render('logo-demo');
})->name('logo-demo');

Route::get('clean-dashboard', function () {
    return Inertia::render('clean-dashboard');
})->name('clean-dashboard');

Route::get('project-timeline', function () {
    return Inertia::render('project-timeline');
})->name('project-timeline');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
