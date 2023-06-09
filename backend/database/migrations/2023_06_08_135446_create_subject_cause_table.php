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
        Schema::create('subject_cause', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("form_id");
            $table->unsignedBigInteger("subject_id");
            $table->boolean("isGood");
            $table->boolean("isInterested");
            $table->boolean("isRequired");
            $table->timestamps();
            $table->foreign("form_id")->references("id")->on("user_form");
            $table->foreign("subject_id")->references("id")->on("subjects");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subject_cause');
    }
};
