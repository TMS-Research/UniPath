<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

         \App\Models\User::factory()->create([
             'name' => 'User',
             'email' => 'test@example.com',
             'password' => 'tes'
         ]);
        $this->call([
            ProgramSeeder::class,
            SubjectGroupSeeder::class,
            SubjectSeeder::class,
            MathStreamSeeder::class,
            ProgramSubjectSeeder::class
        ]);

    }
}
