<?php

use App\Http\Controllers\Api\TaxController;
use App\Http\Controllers\TelegramWebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Telegram webhook (exclude from CSRF protection)
Route::post('/telegram/webhook', [TelegramWebhookController::class, 'handle'])
    ->middleware('throttle:60,1'); // Rate limit: 60 requests per minute

// Tax API Routes
Route::prefix('tax')->group(function () {
    // Get all regions with last update information
    Route::get('/', [TaxController::class, 'index'])->name('api.tax.index');
    
    // Get tax payment details for a specific region
    Route::get('/{region}', [TaxController::class, 'show'])->name('api.tax.show');
    
    // Search tax accounts across all regions
    Route::get('/search', [TaxController::class, 'search'])->name('api.tax.search');
    
    // Get statistics for tax data
    Route::get('/statistics', [TaxController::class, 'statistics'])->name('api.tax.statistics');
});
