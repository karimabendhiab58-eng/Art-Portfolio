<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Artiste;

class ArtisteSeeder extends Seeder
{
    public function run(): void
    {
        Artiste::create(['nom' => 'Sophie Martin', 'email' => 'sophie@art.com', 'specialite' => 'Abstrait', 'bio' => 'Étudiante en beaux-arts spécialisée dans l\'art abstrait.']);
        Artiste::create(['nom' => 'Lucas Dubois', 'email' => 'lucas@art.com', 'specialite' => 'Photographie', 'bio' => 'Photographe passionné par la ville et l\'architecture.']);
        Artiste::create(['nom' => 'Emma Laurent', 'email' => 'emma@art.com', 'specialite' => 'Art Numérique', 'bio' => 'Artiste numérique spécialisée dans les mondes oniriques.']);
        Artiste::create(['nom' => 'Thomas Bernard', 'email' => 'thomas@art.com', 'specialite' => 'Sculpture', 'bio' => 'Sculpteur utilisant des matériaux recyclés.']);
        Artiste::create(['nom' => 'Léa Rousseau', 'email' => 'lea@art.com', 'specialite' => 'Réalisme', 'bio' => 'Peintre réaliste spécialisée dans les portraits.']);
        Artiste::create(['nom' => 'Chloé Petit', 'email' => 'chloe@art.com', 'specialite' => 'Digital Art', 'bio' => 'Illustratrice digitale kawaii aux couleurs pastel.']);
    }
}