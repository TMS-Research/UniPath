<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    
    public function run(): void
    {
        $data = array('Accounting','Actuarial Science','Agriculture / Animal Science','Architecture','Biological Sciences / Environmental Science','Business/Commerce/Finance/Marketing','Communication / Journalism / PR','Computer Science','Drama / Theatre','Economics','Education','Engineering','Fine Arts / Design','Geography','Health Sciences','Hospitality','Humanities / Social Sciences','Information Technology / Information Sciences','Law','Media Communication','Medicine','Music','Nursing','Pharmacy','Physical Sciences / Chemistry','Psychology');

        foreach($data as $da){
            DB::table('programs')->insert([
                'name' => $da,
                'created_at' => now()
            ]);
        }
        
    }
}
