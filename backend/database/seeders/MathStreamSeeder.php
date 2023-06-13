<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MathStreamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = array('MATH AA HL','MATH AI HL', 'MATH SL', 'MATH AI SL');
        foreach($data as $da){
            DB::table('maths_stream')->insert([
                'math_type' => $da,
                'created_at' => now()
            ]);
        }
    }
}
