<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\PadletController;
use \App\Http\Controllers\EntryController;
use \App\Http\Controllers\UserController;
use \App\Http\Controllers\RightController;

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

Route::get("padlets", [PadletController::class, 'index']);
Route::get("padlets/{id}",[PadletController::class, 'findById']);
Route::get("entries/{id}",[EntryController::class, 'getEntryById']);
Route::get("padlets/{id}/entries",[EntryController::class, 'getEntries']);
Route::get("entries/{id}/comments",[EntryController::class, 'getComments']);
Route::get("entries/{id}/ratings",[EntryController::class, 'getRatings']);
Route::get("users/{id}",[UserController::class, 'getUser']);
Route::get("users",[UserController::class, 'getAllUsers']);
Route::get('/padlets/{padlet_id}/users/{user_id}/right', [RightController::class, 'getUserRights']);

Route::group(['middleware'=>['api', 'auth.jwt']], function (){
    Route::post('auth/logout', [AuthController::class,'logout']);
    Route::post("entries/{id}/comments",[EntryController::class, 'saveComment']);
    Route::post("entries/{id}/ratings",[EntryController::class, 'saveRating']);

});
Route::post("padlets/{padletId}/users/{userId}/rights", [RightController::class, 'setUserRights']);

Route::post('padlets', [PadletController::class,'save']);
Route::post('padlets/{id}/entries', [EntryController::class,'saveEntry']);
Route::post('users', [UserController::class,'saveUser']);

Route::put('padlets/{id}', [PadletController::class,'update']);
Route::put('entries/{entryId}', [EntryController::class,'updateEntry']);
Route::put('comments/{id}', [EntryController::class,'updateComment']);
Route::put('ratings/{id}', [EntryController::class,'updateRating']);
Route::put('users/{id}', [UserController::class,'updateUser']);

Route::delete('padlets/{id}', [PadletController::class,'delete']);
Route::delete('entries/{id}', [EntryController::class,'deleteEntry']);
Route::delete('comments/{id}', [EntryController::class,'deleteComment']);
Route::delete('ratings/{id}', [EntryController::class,'deleteRating']);
Route::delete('users/{id}', [UserController::class,'deleteUser']);

