<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'prenom'   => 'required|string|max:100',
            'nom'      => 'required|string|max:100',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'prenom'   => $request->prenom,
            'nom'      => $request->nom,
            'email'    => $request->email,
            'password' => $request->password,
            'role'     => 'membre',
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(['token' => $token, 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['detail' => 'Email ou mot de passe incorrect'], 401);
        }

        return response()->json(['token' => $token, 'user' => auth('api')->user()]);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }
}
