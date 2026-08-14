<?php

namespace App\Http\Controllers;

use App\Models\ShortLink;
use App\Jobs\RecordClickJob;
use Illuminate\Http\Request;

class RedirectController extends Controller
{
    public function __invoke(Request $request, $slug)
    {
        $shortLink = ShortLink::where('slug', $slug)->firstOrFail();
        
        $activeDestination = $shortLink->activeDestination;
        
        if (!$activeDestination) {
            abort(404, 'No active destination found for this link.');
        }

        RecordClickJob::dispatch(
            $shortLink->id,
            $activeDestination->id,
            $request->userAgent() ?? 'Unknown',
            $request->ip() ?? '127.0.0.1'
        );

        return redirect()->away($activeDestination->destination_url, 302);
    }
}
