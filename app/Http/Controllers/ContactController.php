<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'nom'     => 'required|string',
            'email'   => 'required|email',
            'message' => 'required|string',
        ]);

        $to = env('CONTACT_EMAIL', 'hybrideclubdijon@gmail.com');
        $data = $request->only('nom', 'email', 'message');

        Mail::raw(
            "Message de {$data['nom']} ({$data['email']}):\n\n{$data['message']}",
            function ($mail) use ($to, $data) {
                $mail->to($to)
                     ->subject("Contact - {$data['nom']}")
                     ->replyTo($data['email'], $data['nom']);
            }
        );

        return response()->json(['message' => 'Message envoyé']);
    }
}
