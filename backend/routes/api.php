<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AlphabetController;
use App\Http\Controllers\Api\NumberController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\ProgressController;
use App\Http\Controllers\Parent\ChildController;
use App\Http\Controllers\Parent\DashboardController;

// Auth (Breeze API)
Route::post('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);
Route::post('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');

// Current user
Route::get('/me', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Parent routes
Route::middleware(['auth:sanctum', 'role:parent'])->group(function () {
    Route::apiResource('children', ChildController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('dashboard/stats', [DashboardController::class, 'stats']);
});

// Child routes
Route::middleware(['auth:sanctum', 'role:enfant'])->group(function () {
    Route::get('alphabet', [AlphabetController::class, 'index']);
    Route::get('numbers', [NumberController::class, 'index']);
    Route::get('colors', [ColorController::class, 'index']);
    Route::post('progress', [ProgressController::class, 'store']);
});