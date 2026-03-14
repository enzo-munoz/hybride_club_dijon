<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SeanceController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\EvenementController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);
Route::get('/coaches',        [CoachController::class, 'index']);
Route::get('/evenements',     [EvenementController::class, 'index']);
Route::post('/contact',       [ContactController::class, 'send']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::get('/auth/me',              [AuthController::class, 'me']);
    Route::get('/sessions/semaine',     [SeanceController::class, 'semaine']);
    Route::post('/sessions/{id}/vote',  [SeanceController::class, 'vote']);
    Route::put('/sessions/{id}/vote',   [SeanceController::class, 'vote']);
    Route::post('/sessions/generate',   [SeanceController::class, 'generate']);
});
