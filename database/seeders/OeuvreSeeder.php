<?php
namespace Database\Seeders;

use App\Models\Oeuvre;
use App\Models\Artiste;
use Illuminate\Database\Seeder;

class OeuvreSeeder extends Seeder
{
    public function run(): void
    {
        // Mise à jour de l'artiste avec sa photo de profil
        $artiste = Artiste::updateOrCreate(
            ['email' => 'douaa.benjha@artportfolio.tn'], 
            [
                'nom' => 'Douaa Ben Jha',
                'specialite' => 'Artiste Étudiante',
                'photo' => 'duaa_profile.jpeg', // Le nom du fichier que tu as ajouté dans storage
                'bio' => 'Étudiante passionnée par l’art numérique et la peinture, explorant les frontières entre le réel et l’onirique.'
            ]
        );

        $oeuvres = [
            ['titre' => 'Le Château Enchanté', 'image' => 'chateau_poudlard.jpeg', 'cat' => 'Peinture'],
            ['titre' => 'Guitare Onirique', 'image' => 'guitare_foret.jpeg', 'cat' => 'Peinture'],
            ['titre' => 'Le Pont de Nuit', 'image' => 'pont_nuit.jpeg', 'cat' => 'Peinture'],
            ['titre' => 'Maison de Campagne', 'image' => 'maison_campagne.jpeg', 'cat' => 'Peinture'],
            ['titre' => 'La Fillette au Lapin', 'image' => 'fillette_lapin.jpeg', 'cat' => 'Peinture'],
            ['titre' => 'Émotion Profonde', 'image' => 'visage_emotion.jpeg', 'cat' => 'Peinture'],
            ['titre' => 'Ramassage de Coquillages', 'image' => 'enfant_plage.jpeg', 'cat' => 'Peinture'],
            ['titre' => 'Cueillette Matinale', 'image' => 'fillette_fleurs.jpeg', 'cat' => 'Peinture'],
            ['titre' => 'La Maison de l’Artiste', 'image' => 'maison.jpeg', 'cat' => 'Peinture'],
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