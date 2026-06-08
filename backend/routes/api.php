<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Parent\ChildController;
use App\Http\Controllers\Api\AlphabetController;
use App\Http\Controllers\Api\NumberController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\ProgressController;
use App\Http\Controllers\Parent\DashboardController;

Route::middleware(['auth:sanctum', 'role:parent'])->group(function () {
    Route::apiResource('children', ChildController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('dashboard/stats', [DashboardController::class, 'stats']);
});

Route::middleware(['auth:sanctum', 'role:enfant'])->group(function () {
    Route::get('alphabet', [AlphabetController::class, 'index']);
    Route::get('numbers', [NumberController::class, 'index']);
    Route::get('colors', [ColorController::class, 'index']);
    Route::post('progress', [ProgressController::class, 'store']);
});
