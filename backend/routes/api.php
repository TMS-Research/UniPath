<?php

use App\Http\Controllers\FormController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::resource("program", ProgramController::class);
Route::resource("subject", SubjectController::class);
Route::post("/form/stepone", [FormController::class, 'stepone'])->name('form.step-one');
Route::get("/form/steptwo/{id}", [FormController::class, 'show_rr'])->name('form.showrr');
Route::post("/form/steptwo", [FormController::class, 'steptwo'])->name('form.step-two');

require __DIR__.'/auth.php';