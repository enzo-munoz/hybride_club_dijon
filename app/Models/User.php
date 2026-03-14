<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    protected $fillable = [
        'prenom', 'nom', 'email', 'password', 'role', 'bio', 'photo',
    ];

    protected $hidden = ['password'];

    protected function casts(): array
    {
        return ['password' => 'hashed'];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [
            'email' => $this->email,
            'prenom' => $this->prenom,
            'nom' => $this->nom,
            'role' => $this->role,
        ];
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
