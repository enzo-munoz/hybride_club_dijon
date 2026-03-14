<?php

namespace App\Http\Controllers;

use App\Models\Evenement;

class EvenementController extends Controller
{
    public function index()
    {
        return Evenement::orderBy('date')->get();
    }
}
