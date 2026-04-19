<?php
namespace Database\Seeders;

use App\Models\Oeuvre;
use App\Models\Artiste;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OeuvreSeeder extends Seeder
{
    public function run(): void
    {
        $artiste = Artiste::updateOrCreate(
            ['email' => 'douaa.benjha@artportfolio.tn'], 
            [
                'nom' => 'Douaa Ben Jha',
                'specialite' => 'Artiste Étudiante'
            ]
        );

        $oeuvres = [
            ['titre' => 'Le Château Enchanté', 'image' => 'chateau_poudlard.jpeg', 'cat' => 'Digital Art'],
            ['titre' => 'Guitare Onirique', 'image' => 'guitare_foret.jpeg', 'cat' => 'Abstrait'],
            ['titre' => 'Le Pont de Nuit', 'image' => 'pont_nuit.jpeg', 'cat' => 'Photographie'],
            ['titre' => 'Maison de Campagne', 'image' => 'maison_campagne.jpeg', 'cat' => 'Réalisme'],
            ['titre' => 'La Fillette au Lapin', 'image' => 'fillette_lapin.jpeg', 'cat' => 'Digital Art'],
            ['titre' => 'Émotion Profonde', 'image' => 'visage_emotion.jpeg', 'cat' => 'Abstrait'],
            ['titre' => 'Ramassage de Coquillages', 'image' => 'enfant_plage.jpeg', 'cat' => 'Photographie'],
            ['titre' => 'Automne à la Rivière', 'image' => 'paysage_riviere.jpeg', 'cat' => 'Réalisme'],
            ['titre' => 'Cueillette Matinale', 'image' => 'fillette_fleurs.jpeg', 'cat' => 'Réalisme'],
            ['titre' => 'La Maison de l’Artiste', 'image' => 'maison.jpeg', 'cat' => 'Réalisme'],
        ];

        foreach ($oeuvres as $o) {
            Oeuvre::create([
                'artiste_id' => $artiste->id,
                'titre'      => $o['titre'],
                'categorie'  => $o['cat'],
                'description'=> 'Une magnifique œuvre originale réalisée avec passion par Douaa Ben Jha.',
                'prix'       => rand(200, 800),
                'annee'      => 2024,
                'image'      => $o['image'],
            ]);
        }
    }
}