<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = array('Social and Cultural Anthropology','World Religions','Philosophy','Sports','Exercise and Health Science','Any Mathematics stream','Film','Information Technology in a Global Society','Biology','Business Management','Chemistry','Environmental Science','Computer Science','Dance','Theatre','Economics','Geography','Global Politics','History','Languages','Music','Physics','Psychology','Visual Arts',' Design Technology');

        foreach($data as $da){
            DB::table('subjects')->insert([
                'subject_name' => $da,
                'created_at' => now()
            ]);
        }
    }
}
