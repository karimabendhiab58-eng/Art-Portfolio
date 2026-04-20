<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Récupérer tous les messages (C'est ce qui manquait !)
     * Cette méthode répond à la requête GET sur /api/messages
     */
    public function index()
    {
        // On récupère tous les messages du plus récent au plus ancien
        $messages = Message::orderBy('created_at', 'desc')->get();
        
        // On retourne la liste en format JSON
        return response()->json($messages, 200);
    }

    /**
     * Envoyer et enregistrer un message
     * Cette méthode répond à la requête POST sur /api/messages
     */
    public function store(Request $request)
    {
        // Validation des données entrantes
        $request->validate([
            'nom'                => 'required|string',
            'email'              => 'required|email',
            'type_collaboration' => 'required|string',
            'sujet'              => 'required|string',
            'message'            => 'required|string',
        ]);

        // Création automatique dans la base de données
        // Assure-toi que les colonnes dans PostgreSQL ont ces mêmes noms
        $message = Message::create($request->all());

        return response()->json($message, 201);
    }
}