<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    protected $fillable = ['titre', 'description', 'date', 'lieu'];

    protected function casts(): array
    {
        return ['date' => 'datetime'];
    }
}
