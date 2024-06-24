<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Devdojo\Auth\Models\SocialProviderUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Devdojo\Auth\Models\User as AuthUser;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends AuthUser
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin()
    {
        return auth()->check() && auth()->user()->role === 'admin';
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function socialUsers() : HasMany
    {
        return $this->hasMany(SocialProviderUser::class,'user_id');
    }

    public function avatar()
    {
        $socialProvider = SocialProviderUser::where('user_id', auth()->id())->first();
        return $socialProvider->avatar;
    }
}
