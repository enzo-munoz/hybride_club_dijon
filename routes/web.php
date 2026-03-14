<?php

use Illuminate\Support\Facades\Route;

// Catch-all: serve React SPA for all non-API routes
Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');
