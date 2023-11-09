<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
protected $fillable = ['title', 'author', 'publication_date', 'isbn', 'genre','category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
