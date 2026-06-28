<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alphabet extends Model
{
    protected $fillable = [
        'name',
        'hex_code',
        'sound_url',
        'example_word'
    ];
}
