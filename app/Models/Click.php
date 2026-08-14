<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    use HasFactory;

    public $timestamps = false; // We use clicked_at

    protected $fillable = [
        'short_link_id',
        'link_destination_id',
        'clicked_at',
        'user_agent',
        'ip_address',
    ];

    protected $casts = [
        'clicked_at' => 'datetime',
    ];

    public function shortLink()
    {
        return $this->belongsTo(ShortLink::class);
    }

    public function destination()
    {
        return $this->belongsTo(LinkDestination::class, 'link_destination_id');
    }
}
