<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    protected $fillable = ['parent_id', 'user_id', 'name', 'age'];

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function account()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function progress()
    {
        return $this->hasMany(Progress::class);
    }
}
