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
        Schema::create('user_form', function (Blueprint $table) {
            $table->id();
            $table->enum('meeting_person', ["Ms.Ellie", "Mr.Eric"]);
            $table->datetime("meeting_time");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_form');
    }
};
