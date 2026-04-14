<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artwork;
use App\Http\Requests\StoreArtworkRequest;

class ArtworkController extends Controller
{
    /**
     * Enregistrer une nouvelle œuvre d'art.
     */
    public function store(StoreArtworkRequest $request)
    {
        $user = auth()->user();

        // 1. Contrôle métier : Vérification de la limite du plan gratuit
        if (!$user->isPremium() && $user->artworks()->count() >= 5) {
            return response()->json([
                'message' => 'Limite de publication atteinte (5 max). Veuillez passer au plan premium.'
            ], 403);
        }

        // 2. Gestion du stockage de l'image
        $imagePath = $request->file('image')->store('artworks', 'public');

        // 3. Insertion dans la base de données
        $artwork = Artwork::create([
            'title'       => $request->title,
            'description' => $request->description,
            'price'       => $request->price,
            'category_id' => $request->category_id,
            'image_path'  => $imagePath,
            'user_id'     => $user->id,
            'status'      => 'published',
        ]);

        return response()->json($artwork, 201);
    }
}
