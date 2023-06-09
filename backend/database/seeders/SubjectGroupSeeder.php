<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = array("Language & Literature", "Language Acquisition", "Individuals & Societies", "Science","Mathematics","Arts");

        foreach($data as $da){
            DB::table("subject_group")->insert([
                'group_name' => $da,
                'created_at' => now()
            ]);
        }
    }
}
