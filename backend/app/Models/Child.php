<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    protected $fillable = ['parent_id', 'user_id', 'name', 'age']; // Secure assignment array[cite: 1]

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function userAccount()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function progressRecords()
    {
        return $this->hasMany(Progress::class);
    }
}
