<?php

namespace App\Http\Controllers;

use App\Models\Artiste;
use Illuminate\Http\Request;

class ArtisteController extends Controller
{
    // Récupérer tous les artistes
    public function index()
    {
        $artistes = Artiste::with('oeuvres')->get();
        return response()->json($artistes);
    }

    // Récupérer un artiste par son id
    public function show($id)
    {
        $artiste = Artiste::with('oeuvres')->findOrFail($id);
        return response()->json($artiste);
    }

    // Créer un artiste
    public function store(Request $request)
    {
        $request->validate([
            'nom'       => 'required|string',
            'email'     => 'required|email|unique:artistes',
            'specialite'=> 'required|string',
        ]);

        $artiste = Artiste::create($request->all());
        return response()->json($artiste, 201);
    }
}