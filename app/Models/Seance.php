<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    protected $table = 'seances';

    protected $fillable = ['date', 'heure_fin', 'deadline_vote'];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
            'heure_fin' => 'datetime',
            'deadline_vote' => 'datetime',
        ];
    }

    public function votes()
    {
        return $this->hasMany(Vote::class, 'seance_id');
    }
}
