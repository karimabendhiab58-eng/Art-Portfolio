<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artiste extends Model
{
    protected $fillable = [
        'nom',
        'email',
        'specialite',
        'bio',
        'photo'
    ];

    public function oeuvres()
    {
        return $this->hasMany(Oeuvre::class);
    }
}