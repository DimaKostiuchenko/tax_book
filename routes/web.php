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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
