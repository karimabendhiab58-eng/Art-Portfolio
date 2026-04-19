<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtisteController;
use App\Http\Controllers\OeuvreController;
use App\Http\Controllers\MessageController;

Route::get('/artistes', [ArtisteController::class, 'index']);
Route::get('/artistes/{id}', [ArtisteController::class, 'show']);
Route::post('/artistes', [ArtisteController::class, 'store']);

Route::get('/oeuvres', [OeuvreController::class, 'index']);
Route::get('/oeuvres/{id}', [OeuvreController::class, 'show']);
Route::post('/oeuvres', [OeuvreController::class, 'store']);

Route::get('/messages', [MessageController::class, 'index']);
Route::post('/messages', [MessageController::class, 'store']);