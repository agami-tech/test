<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BooksController extends Controller
{
    // Create a new book
    public function store(Request $request)
    {
//        dd($request->all());
        $data = $request->validate([
            'title' => 'required',
            'author' => 'required',
            'genre' => 'required',
            'description' => 'required',
            'isbn' => 'required',
            'image' => 'required',
            'published' => 'required',
            'publisher' => 'required',
            'category_id' => 'required|exists:categories,id',
        ]);
        $book = Book::create($data);

        return response()->json($book, 201);
    }

    // Read all books with category information
    public function index()
    {
        $books = Book::with('category')->paginate(10);

        return response()->json($books, 200);
    }

    // Read a single book with category information
    public function show($id)
    {
        $book = Book::with('category')->find($id);

        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        return response()->json($book, 200);
    }

    // Update a book
    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        $data = $request->validate([
            'title' => 'required',
            'author' => 'required',
            'genre' => 'required',
            'category_id' => 'required|exists:categories,id',
        ]);

        $book->update($data);

        return response()->json($book, 200);
    }

    // Delete a book
    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        $book->delete();

        return response()->json(['message' => 'Book deleted'], 204);
    }


}
