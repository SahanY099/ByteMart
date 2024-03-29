<?php

use App\Http\Controllers\Products\AttributeController;
use App\Http\Controllers\Products\ProductTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SignupController;

use App\Http\Controllers\Products\ProductController;

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

Route::prefix('auth')->group(function () {
    Route::controller(SignupController::class)->group(function () {
        Route::post('/signup', 'signup');
    });
    Route::controller(LoginController::class)->group(function () {
        Route::post('/login', 'login');
    });
});

Route::prefix('products')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('/products', ProductController::class);
    });

    Route::apiResource('types', ProductTypeController::class);
    Route::apiResource('types.attributes', AttributeController::class)->shallow();
});
