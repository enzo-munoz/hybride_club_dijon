<?php

namespace App\Http\Controllers;

use App\Models\User;

class CoachController extends Controller
{
    public function index()
    {
        return User::where('role', 'coach')
            ->select('id', 'prenom', 'nom', 'bio', 'photo')
            ->get();
    }
}
