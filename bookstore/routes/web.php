<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BooksController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/books', [BooksController::class, 'index']); // List all books
Route::post('/books', [BooksController::class, 'store']); // Create a new book
Route::get('/books/{book}', [BooksController::class, 'show']); // Retrieve a specific book
Route::put('/books/{book}', [BooksController::class, 'update']); // Update a specific book
Route::delete('/books/{book}', [BooksController::class, 'destroy']);
