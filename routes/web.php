<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Auth;



Route::get('/', function () {
    return redirect()->route(Auth::check() ? 'tasks.index' : 'login');
})->name('home');

Route::middleware('auth')->controller(ProfileController::class)->group(function () {
    Route::get('/profile', 'edit')->name('profile.edit');
    Route::patch('/profile', 'update')->name('profile.update');
    Route::delete('/profile', 'destroy')->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::resource('projects', ProjectController::class)->only(['index', 'store', 'destroy']);
    Route::prefix('tasks')->name('tasks.')->group(function () {
        Route::post('/reorder', [TaskController::class, 'reorder'])->name('reorder');
        Route::resource('/', TaskController::class)->only(['index', 'store', 'update', 'destroy']);
    });
});

require __DIR__.'/auth.php';
