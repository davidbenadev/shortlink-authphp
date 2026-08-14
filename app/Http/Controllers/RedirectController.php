<?php

namespace App\Http\Controllers;

use App\Models\ShortLink;
use App\Jobs\RecordClickJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RedirectController extends Controller
{
    public function __invoke(Request $request, $slug)
    {
        $shortLink = ShortLink::where('slug', $slug)
            ->orWhere('slug', strtolower($slug))
            ->first();
        
        if (!$shortLink) {
            abort(404, 'Short link not found.');
        }

        $activeDestination = $shortLink->activeDestination;
        
        if (!$activeDestination) {
            abort(404, 'No active destination found for this link.');
        }

        try {
            RecordClickJob::dispatch(
                $shortLink->id,
                $activeDestination->id,
                $request->userAgent() ?? 'Unknown',
                $request->ip() ?? '127.0.0.1'
            );
        } catch (\Throwable $e) {
            Log::error('Failed to record click: ' . $e->getMessage());
        }

        return redirect()->away($activeDestination->destination_url, 302);
    }
}
