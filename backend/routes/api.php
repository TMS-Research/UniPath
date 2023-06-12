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
Route::get("/form/steptwo/sb/{id}", [FormController::class, 'show_gs'])->name('form.show-gs');
Route::get("/form/stepthree/{id}", [FormController::class, 'show_fs'])->name('form.showfs');
Route::post("/form/stepthree", [FormController::class, 'stepthree'])->name('form.step-three');
Route::post("/form/stepfour", [FormController::class, 'stepfour'])->name('form.step-four');
Route::get("/form/final/{id}", [FormController::class, 'finalstep'])->name('form.finalstep');

require __DIR__.'/auth.php';