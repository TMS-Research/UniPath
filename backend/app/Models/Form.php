<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;

    protected $table = 'user_form';

    protected $guarded = [];
    
    protected $fillable = [
        'user_id'
    ];
}
