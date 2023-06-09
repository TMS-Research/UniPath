<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = array(array(1, 29), array(1, 31), array(1, 6), array(2, 31), array(2, 6), array(3, 35), array(3, 35), array(4, 32), array(4, 26), array(4, 6), array(5, 35), array(5, 35), array(6, 29), array(6, 31), array(7, 38), array(7, 36), array(8, 38), array(8, 8), array(8, 6), array(9, 29), array(9, 27), array(9, 28), array(10, 31), array(10, 6), array(11, 33), array(11, 1), array(12, 37), array(12, 36), array(12, 32), array(12, 38), array(12, 6), array(13, 26), array(13, 7), array(13, 32), array(14, 17), array(15, 35), array(15, 36), array(15, 4), array(15, 5), array(16, 29), array(16, 38), array(17, 34), array(17, 36), array(17, 1), array(17, 2), array(17, 3), array(18, 38), array(18, 8), array(18, 6), array(19, 36), array(19, 34), array(19, 38), array(20, 38), array(20, 7), array(20, 8), array(21, 35), array(21, 36), array(21, 4), array(21, 5), array(22, 28), array(23, 35), array(23, 33), array(23, 4), array(23, 5), array(24, 36), array(24, 35), array(25, 36), array(25, 37), array(25, 35), array(25, 6), array(26, 33), array(26, 35));

        foreach ($data as $da) {
            DB::table('program_subject')->insert([
                'program_id' => $da[0],
                'subject_id' => $da[1],
                'created_at' => now()
            ]);
        }
    }
}
