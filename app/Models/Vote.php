<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = ['seance_id', 'user_id', 'presence'];

    protected function casts(): array
    {
        return ['presence' => 'boolean'];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function seance()
    {
        return $this->belongsTo(Seance::class, 'seance_id');
    }
}
