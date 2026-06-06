<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    protected $table = 'progress';

    protected $fillable = [
        'child_id',
        'content_type',
        'content_id',
        'completed',
        'attempts'
    ];

    public function child()
    {
        return $this->belongsTo(Child::class);
    }
}
