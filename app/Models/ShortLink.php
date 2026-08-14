<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShortLink extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'slug',
        'title',
        'qr_code_path',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function destinations()
    {
        return $this->hasMany(LinkDestination::class);
    }

    public function clicks()
    {
        return $this->hasMany(Click::class);
    }

    public function activeDestination()
    {
        return $this->hasOne(LinkDestination::class)->where('is_active', true);
    }
}
