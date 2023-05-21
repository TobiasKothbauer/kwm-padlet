<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\PadletController;
use \App\Http\Controllers\EntryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('auth/login', [AuthController::class,'login']);
Route::post('auth/logout', [AuthController::class,'logout']);


Route::get("padlets", [PadletController::class, 'index']);
Route::get("padlets/{id}",[PadletController::class, 'findById']);
Route::get("padlets/{id}/entries",[EntryController::class, 'getEntries']);
Route::get("entries/{id}/comments",[EntryController::class, 'getComments']);
Route::get("entries/{id}/ratings",[EntryController::class, 'getRatings']);

Route::post('padlets', [PadletController::class,'save']);
Route::post('padlets/{id}/entries', [EntryController::class,'saveEntry']);
Route::post("entries/{id}/comments",[EntryController::class, 'saveComment']);
Route::post("entries/{id}/ratings",[EntryController::class, 'saveRating']);

Route::put('padlets/{id}', [PadletController::class,'update']);

Route::delete('padlets/{id}', [PadletController::class,'delete']);
Route::delete('entries/{id}', [EntryController::class,'deleteEntry']);

