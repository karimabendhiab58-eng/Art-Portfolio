<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Oeuvre extends Model
{
    protected $fillable = [
        'artiste_id',
        'titre',
        'categorie',
        'description',
        'prix',
        'annee',
        'image'
    ];

    public function artiste()
    {
        return $this->belongsTo(Artiste::class);
    }
}