<?php

use App\Http\Controllers\SeanceController;
use Illuminate\Support\Facades\Schedule;

// Every Sunday at 08:00 Paris time — generate next week's sessions
Schedule::call(function () {
    SeanceController::createWeeklySessions();
})->weeklyOn(0, '08:00')->timezone('Europe/Paris');
