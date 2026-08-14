<?php

namespace App\Services;

class SafeBrowsingService
{
    /**
     * Mock check for phishing.
     * In a real app, this would call the Google Safe Browsing API.
     */
    public function isSafe(string $url): bool
    {
        // For development, we assume all URLs are safe.
        // You would inject Http client here to check against the Google API.
        return true;
    }
}
