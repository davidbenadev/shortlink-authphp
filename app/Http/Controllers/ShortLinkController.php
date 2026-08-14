<?php

namespace App\Http\Controllers;

use App\Models\ShortLink;
use App\Services\SafeBrowsingService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ShortLinkController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $links = $request->user()->shortLinks()->withCount('clicks')->latest()->get();
        return Inertia::render('Dashboard', ['links' => $links]);
    }

    public function create()
    {
        return Inertia::render('ShortLinks/Create');
    }

    public function store(Request $request, SafeBrowsingService $safeBrowsing)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'destination_url' => 'required|url',
            'slug' => 'nullable|string|alpha_dash|max:50|unique:short_links,slug',
        ]);

        if (!$safeBrowsing->isSafe($request->destination_url)) {
            return back()->withErrors(['destination_url' => 'The provided URL is flagged as unsafe.']);
        }

        $slug = $request->slug ? Str::lower($request->slug) : Str::random(6);

        while (ShortLink::where('slug', $slug)->exists()) {
            $slug = Str::random(6);
        }

        $shortLink = $request->user()->shortLinks()->create([
            'title' => $request->title,
            'slug' => $slug,
        ]);

        $shortLink->destinations()->create([
            'destination_url' => $request->destination_url,
            'is_active' => true,
        ]);

        $qrCode = QrCode::format('svg')->size(300)->generate(url('/' . $slug));
        $path = 'qrcodes/' . $shortLink->id . '.svg';
        Storage::disk('public')->put($path, (string) $qrCode);
        
        $shortLink->update(['qr_code_path' => $path]);

        return redirect()->route('dashboard')->with('success', 'Short link created successfully.');
    }

    public function edit(ShortLink $shortLink)
    {
        $this->authorize('update', $shortLink);
        
        $shortLink->load(['activeDestination']);
        return Inertia::render('ShortLinks/Edit', ['shortLink' => $shortLink]);
    }

    public function update(Request $request, ShortLink $shortLink, SafeBrowsingService $safeBrowsing)
    {
        $this->authorize('update', $shortLink);

        $targetSlug = Str::lower($request->slug);

        $request->merge(['slug' => $targetSlug]);

        $request->validate([
            'title' => 'required|string|max:255',
            'destination_url' => 'required|url',
            'slug' => 'required|string|alpha_dash|max:50|unique:short_links,slug,' . $shortLink->id,
        ]);

        if (!$safeBrowsing->isSafe($request->destination_url)) {
            return back()->withErrors(['destination_url' => 'The provided URL is flagged as unsafe.']);
        }

        $slugChanged = $shortLink->slug !== $targetSlug;

        $shortLink->update([
            'title' => $request->title,
            'slug' => $targetSlug,
        ]);

        if ($slugChanged || !$shortLink->qr_code_path || !Storage::disk('public')->exists($shortLink->qr_code_path)) {
            $qrCode = QrCode::format('svg')->size(300)->generate(url('/' . $request->slug));
            $path = 'qrcodes/' . $shortLink->id . '.svg';
            Storage::disk('public')->put($path, (string) $qrCode);
            $shortLink->update(['qr_code_path' => $path]);
        }

        $currentDestination = $shortLink->activeDestination;

        if (!$currentDestination || $currentDestination->destination_url !== $request->destination_url) {
            if ($currentDestination) {
                $currentDestination->update(['is_active' => false]);
            }
            $shortLink->destinations()->create([
                'destination_url' => $request->destination_url,
                'is_active' => true,
            ]);
        }

        return redirect()->route('dashboard')->with('success', 'Short link updated successfully.');
    }

    public function destroy(ShortLink $shortLink)
    {
        $this->authorize('delete', $shortLink);
        
        if ($shortLink->qr_code_path && Storage::disk('public')->exists($shortLink->qr_code_path)) {
            Storage::disk('public')->delete($shortLink->qr_code_path);
        }

        $shortLink->delete();
        return redirect()->route('dashboard')->with('success', 'Short link deleted successfully.');
    }
}
