<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FormTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_step_one(): void
    {
        $response = $this->post('/api/form/stepone', ['programs' => [1,2,3]]);

        $response->assertStatus(200);
    }
}
