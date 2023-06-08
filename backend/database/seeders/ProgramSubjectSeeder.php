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
        $data = array(array(1, 10), array(1, 16), array(1, 6), array(2, 16), array(2, 6), array(3, 9), array(3, 12), array(4, 25), array(4, 24), array(4, 6), array(5, 9), array(5, 12), array(6, 10), array(6, 16), array(7, 20), array(7, 18), array(8, 13), array(8, 8), array(8, 6), array(9, 14), array(9, 15), array(9, 21), array(10, 16), array(10, 6), array(11, 23), array(11, 1), array(12, 22), array(12, 11), array(12, 25), array(12, 13), array(12, 6), array(13, 24), array(13, 7), array(13, 25), array(14, 17), array(15, 9), array(15, 11), array(15, 4), array(15, 5), array(16, 10), array(16, 20), array(17, 19), array(17, 18), array(17, 1), array(17, 2), array(17, 3), array(18, 13), array(18, 8), array(18, 6), array(19, 18), array(19, 19), array(19, 20), array(20, 20), array(20, 7), array(20, 8), array(21, 9), array(21, 11), array(21, 4), array(21, 5), array(22, 21), array(23, 9), array(23, 23), array(23, 4), array(23, 5), array(24, 11), array(24, 9), array(25, 11), array(25, 22), array(25, 12), array(25, 6), array(26, 23), array(26, 9));

        foreach ($data as $da) {
            DB::table('program_subject')->insert([
                'program_id' => $da[0],
                'subject_id' => $da[1],
                'created_at' => now()
            ]);
        }
    }
}
