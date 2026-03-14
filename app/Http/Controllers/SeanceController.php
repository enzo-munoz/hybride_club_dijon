<?php

namespace App\Http\Controllers;

use App\Models\Seance;
use App\Models\Vote;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SeanceController extends Controller
{
    public function semaine()
    {
        $user = auth('api')->user();
        $monday = Carbon::now('Europe/Paris')->startOfWeek();

        $seances = Seance::with('votes.user')
            ->where('date', '>=', $monday)
            ->orderBy('date')
            ->limit(6)
            ->get();

        return $seances->map(function ($seance) use ($user) {
            $userVote = $seance->votes->firstWhere('user_id', $user->id);
            return [
                'id'            => $seance->id,
                'date'          => $seance->date->toISOString(),
                'heure_fin'     => $seance->heure_fin->toISOString(),
                'deadline_vote' => $seance->deadline_vote->toISOString(),
                'reponses'      => $seance->votes->map(fn($v) => [
                    'user_id'  => $v->user->email,
                    'prenom'   => $v->user->prenom,
                    'presence' => $v->presence,
                ]),
                'user_vote' => $userVote ? ['presence' => $userVote->presence] : null,
            ];
        });
    }

    public function vote(Request $request, $id)
    {
        $request->validate(['presence' => 'required|boolean']);

        $seance = Seance::findOrFail($id);
        $user = auth('api')->user();

        if (Carbon::now('Europe/Paris')->gt($seance->deadline_vote)) {
            return response()->json(['detail' => 'Deadline de vote dépassée'], 400);
        }

        Vote::updateOrCreate(
            ['seance_id' => $seance->id, 'user_id' => $user->id],
            ['presence' => $request->presence]
        );

        return response()->json(['message' => 'Vote enregistré']);
    }

    public function generate()
    {
        $user = auth('api')->user();

        if ($user->role !== 'coach') {
            return response()->json(['detail' => 'Accès réservé aux coachs'], 403);
        }

        return response()->json(['message' => $this->createWeeklySessions().' séances générées']);
    }

    public static function createWeeklySessions(): int
    {
        $paris = new \DateTimeZone('Europe/Paris');
        $nextMonday = Carbon::now($paris)->next('Monday')->startOfDay();

        $existing = Seance::whereDate('date', '>=', $nextMonday->toDateString())
            ->whereDate('date', '<', $nextMonday->copy()->addDays(6)->toDateString())
            ->exists();

        if ($existing) return 0;

        $count = 0;
        for ($i = 0; $i < 6; $i++) {
            $day = $nextMonday->copy()->addDays($i);
            $deadline = $day->copy()->subDay()->setTime(23, 59, 0);

            Seance::create([
                'date'          => $day->copy()->setTime(18, 0, 0),
                'heure_fin'     => $day->copy()->setTime(19, 30, 0),
                'deadline_vote' => $deadline,
            ]);
            $count++;
        }

        return $count;
    }
}
