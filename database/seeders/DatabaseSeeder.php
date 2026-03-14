<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Seance;
use App\Models\Vote;
use App\Models\Evenement;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Coaches
        $coach1 = User::create([
            'prenom'   => 'Thomas',
            'nom'      => 'Dupont',
            'email'    => 'thomas@hybrideclub.fr',
            'password' => 'coach123',
            'role'     => 'coach',
            'bio'      => 'Coach certifié Hyrox avec 8 ans d\'expérience. Spécialiste en préparation physique et endurance.',
            'photo'    => null,
        ]);

        User::create([
            'prenom'   => 'Sarah',
            'nom'      => 'Martin',
            'email'    => 'sarah@hybrideclub.fr',
            'password' => 'coach123',
            'role'     => 'coach',
            'bio'      => 'Athlète Hyrox compétitrice et coach passionnée. Spécialiste en force et conditionnement.',
            'photo'    => null,
        ]);

        // Membres
        $membreModels = [];
        foreach ([
            ['prenom' => 'Lucas',   'nom' => 'Bernard', 'email' => 'lucas@test.fr'],
            ['prenom' => 'Emma',    'nom' => 'Leroy',   'email' => 'emma@test.fr'],
            ['prenom' => 'Nathan',  'nom' => 'Moreau',  'email' => 'nathan@test.fr'],
            ['prenom' => 'Camille', 'nom' => 'Simon',   'email' => 'camille@test.fr'],
            ['prenom' => 'Maxime',  'nom' => 'Laurent', 'email' => 'maxime@test.fr'],
        ] as $m) {
            $membreModels[] = User::create([
                'prenom'   => $m['prenom'],
                'nom'      => $m['nom'],
                'email'    => $m['email'],
                'password' => 'membre123',
                'role'     => 'membre',
            ]);
        }

        // Séances de la semaine en cours (lundi → samedi)
        $paris   = new \DateTimeZone('Europe/Paris');
        $monday  = Carbon::now($paris)->startOfWeek();
        $seances = [];

        for ($i = 0; $i < 6; $i++) {
            $day      = $monday->copy()->addDays($i);
            $deadline = $day->copy()->subDay()->setTime(23, 59, 0);

            $seances[] = Seance::create([
                'date'          => $day->copy()->setTime(18, 0, 0),
                'heure_fin'     => $day->copy()->setTime(19, 30, 0),
                'deadline_vote' => $deadline,
            ]);
        }

        // Votes fictifs sur les 3 premières séances
        foreach ([
            [$membreModels[0], $seances[0], true],
            [$membreModels[1], $seances[0], true],
            [$membreModels[2], $seances[0], false],
            [$membreModels[0], $seances[1], true],
            [$membreModels[3], $seances[1], true],
            [$membreModels[4], $seances[1], true],
            [$membreModels[1], $seances[2], false],
            [$membreModels[2], $seances[2], true],
        ] as [$user, $seance, $presence]) {
            Vote::create([
                'seance_id' => $seance->id,
                'user_id'   => $user->id,
                'presence'  => $presence,
            ]);
        }

        // Événements
        foreach ([
            [
                'titre'       => 'Hyrox Dijon 2025',
                'description' => 'Compétition officielle Hyrox à Dijon. Inscriptions ouvertes pour les membres du club.',
                'date'        => Carbon::now()->addMonths(2)->setTime(9, 0),
                'lieu'        => 'Dijon Expo, Dijon',
            ],
            [
                'titre'       => 'Stage intensif été',
                'description' => 'Weekend de préparation physique intensive avec nos coachs certifiés.',
                'date'        => Carbon::now()->addMonths(1)->setTime(8, 0),
                'lieu'        => 'Salle Hybride Club, Dijon',
            ],
            [
                'titre'       => 'Open Day',
                'description' => 'Portes ouvertes du club — venez découvrir le Hyrox et nos coachs.',
                'date'        => Carbon::now()->addWeeks(2)->setTime(10, 0),
                'lieu'        => 'Salle Hybride Club, Dijon',
            ],
        ] as $event) {
            Evenement::create($event);
        }

        $this->command->info('Base peuplée avec succès.');
        $this->command->info('  Coach :  thomas@hybrideclub.fr / coach123');
        $this->command->info('  Membre : lucas@test.fr / membre123');
    }
}
