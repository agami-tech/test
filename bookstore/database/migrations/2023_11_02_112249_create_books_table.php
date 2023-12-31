<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
	$table->id();
        $table->string('title');
        $table->string('author');
        $table->date('publication_date')->default(DB::raw('CURRENT_TIMESTAMP'));
        $table->string('isbn');
        $table->string('genre');
        $table->unsignedBigInteger('category_id')->index();
        $table->foreign('category_id')->references('id')->on('categories');
        $table->timestamps();

	});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
