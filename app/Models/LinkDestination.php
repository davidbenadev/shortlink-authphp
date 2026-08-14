<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LinkDestination extends Model
{
    use HasFactory;

    protected $fillable = [
        'short_link_id',
        'destination_url',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function shortLink()
    {
        return $this->belongsTo(ShortLink::class);
    }

    public function clicks()
    {
        return $this->hasMany(Click::class);
    }
}
