<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShortLinkController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\RedirectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Cache\RateLimiting\Limit;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ShortLinkController::class, 'index'])->name('dashboard');
    Route::resource('short-links', ShortLinkController::class)->except(['index', 'show']);
    Route::get('/short-links/{shortLink}/analytics', [AnalyticsController::class, 'show'])->name('short-links.analytics');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';



// The redirect public route (must be at the end to not catch other routes)
Route::get('/{slug}', RedirectController::class)
    ->middleware('throttle:redirect')
    ->name('redirect');
