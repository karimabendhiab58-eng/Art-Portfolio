<?php

namespace App\Http\Controllers;

use App\Models\Oeuvre;
use Illuminate\Http\Request;

class OeuvreController extends Controller
{
    // Récupérer toutes les oeuvres
    public function index(Request $request)
    {
        $query = Oeuvre::with('artiste');

        // Filtrer par catégorie si demandé
        if ($request->has('categorie')) {
            $query->where('categorie', $request->categorie);
        }

        $oeuvres = $query->get();
        return response()->json($oeuvres);
    }

    // Récupérer une oeuvre par son id
    public function show($id)
    {
        $oeuvre = Oeuvre::with('artiste')->findOrFail($id);
        return response()->json($oeuvre);
    }

    // Créer une oeuvre
    public function store(Request $request)
    {
        $request->validate([
            'artiste_id' => 'required|exists:artistes,id',
            'titre'      => 'required|string',
            'categorie'  => 'required|string',
            'prix'       => 'required|numeric',
            'annee'      => 'required|integer',
        ]);

        $oeuvre = Oeuvre::create($request->all());
        return response()->json($oeuvre, 201);
    }
}