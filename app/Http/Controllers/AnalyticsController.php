<?php

namespace App\Http\Controllers;

use App\Models\ShortLink;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AnalyticsController extends Controller
{
    use AuthorizesRequests;

    public function show(ShortLink $shortLink)
    {
        $this->authorize('view', $shortLink);

        $totalClicks = $shortLink->clicks()->count();

        $clicksOverTime = $shortLink->clicks()
            ->select(DB::raw('DATE(clicked_at) as date'), DB::raw('count(*) as count'))
            ->where('clicked_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $destinations = $shortLink->destinations()->withCount('clicks')->get();

        return Inertia::render('ShortLinks/Analytics', [
            'shortLink' => $shortLink,
            'totalClicks' => $totalClicks,
            'clicksOverTime' => $clicksOverTime,
            'destinations' => $destinations,
        ]);
    }
}
