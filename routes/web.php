<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Front\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\SocialiteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/product/{id}/show', [HomeController::class, 'show'])->name('product.show');
Route::get('/categories/{category}/products', [HomeController::class, 'categoryProducts'])->name('category.products');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/bookings', [HomeController::class, 'bookings'])->name('bookings');
    Route::post('/booking/store', [HomeController::class, 'bookingStore'])->name('bookings.store');
    Route::delete('/bookings/{id}', [HomeController::class, 'bookingDestroy'])->name('bookings.destroy');
    
    Route::post('/reviews/store', [ReviewsController::class, 'store'])->name('reviews.store');
});

Route::prefix('auth')->group(function(){
    
    // Route::get('facebook/login', [SocialiteController::class, 'handleLoginWithFacebook']);
    Route::get('facebook/callback', [SocialiteController::class, 'handleFacebookCallback'])->name('facebook.callback');
});
Route::get('/auth/facebook/login', function () {
    return Inertia::location(Socialite::driver('facebook')->redirect());    
})->name('facebook.login');


require __DIR__ . '/auth.php';
