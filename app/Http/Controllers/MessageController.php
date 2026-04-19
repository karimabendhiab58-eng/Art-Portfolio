<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // Récupérer tous les messages
    public function index()
    {
        $messages = Message::orderBy('created_at', 'desc')->get();
        return response()->json($messages);
    }

    // Envoyer un message
    public function store(Request $request)
    {
        $request->validate([
            'nom'               => 'required|string',
            'email'             => 'required|email',
            'type_collaboration'=> 'required|string',
            'sujet'             => 'required|string',
            'message'           => 'required|string',
        ]);

        $message = Message::create($request->all());
        return response()->json($message, 201);
    }
}