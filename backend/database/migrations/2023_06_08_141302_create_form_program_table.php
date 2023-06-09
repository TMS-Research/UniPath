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
        Schema::create('form_program', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("form_id");
            $table->unsignedBigInteger("program_id");
            $table->timestamps();

            $table->foreign('form_id')->references('id')->on('user_form');
            $table->foreign('program_id')->references('id')->on('programs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_program');
    }
};
