<?php

namespace App\Jobs;

use App\Models\Click;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RecordClickJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public string $shortLinkId,
        public int $linkDestinationId,
        public string $userAgent,
        public string $ipAddress
    ) {}

    public function handle(): void
    {
        $ipParts = explode('.', $this->ipAddress);
        if (count($ipParts) === 4) {
            $ipParts[3] = '0';
            $anonymizedIp = implode('.', $ipParts);
        } else {
            $anonymizedIp = substr($this->ipAddress, 0, 9) . '...';
        }

        Click::create([
            'short_link_id' => $this->shortLinkId,
            'link_destination_id' => $this->linkDestinationId,
            'clicked_at' => now(),
            'user_agent' => substr($this->userAgent, 0, 255),
            'ip_address' => $anonymizedIp,
        ]);
    }
}
