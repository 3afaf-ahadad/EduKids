<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Parent\ChildController;

Route::middleware(['auth:sanctum', 'role:parent'])->group(function () {
    Route::apiResource('children', ChildController::class)->only(['index', 'store', 'update', 'destroy']);
});