<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datanogr = array('Social and Cultural Anthropology','World Religions','Philosophy','Sports','Exercise and Health Science','Any Mathematics stream','Film','Information Technology in a Global Society','Environmental Science','Dance','Global Politics','History','Languages','Design Technology');

        $datawithgr = array('Indonesia A', 'English A', 'Korean A', 'English B', 'Indonesian B', 'Chinese B-Mandarin', 'French ab initio','Mathematics: Analysis and Approaches HL', 'Mathematics: Analysis and Approaches SL', 'Mathematics: Applications and Interpretation HL', 'Mathematics: Applications and Interpretation SL', 'Visual Arts', 'Theatre', 'Music','Business Management', 'Digital Society', 'Economics', 'Geography', 'Psychology', 'Environmental systems and societies', 'Biology', 'Chemistry', 'Physics','Computer Science');

        $no = array(1,1,1,2,2,2,2,5,5,5,5,6,6,6,3,3,3,3,3,3,4,4,4,4);
        foreach($datanogr as $da){
            DB::table('subjects')->insert([
                'name' => $da,
                'created_at' => now()
            ]);
        }

        foreach($datawithgr as $key => $da){
            DB::table('subjects')->insert([
                'name' => $da,
                'group_id' => $no[$key],
                'created_at' => now()
            ]);
        }
    }
}
