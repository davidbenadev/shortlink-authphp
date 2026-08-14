<?php

namespace App\Policies;

use App\Models\ShortLink;
use App\Models\User;

class ShortLinkPolicy
{
    public function view(User $user, ShortLink $shortLink): bool
    {
        return $user->id === $shortLink->user_id;
    }

    public function update(User $user, ShortLink $shortLink): bool
    {
        return $user->id === $shortLink->user_id;
    }

    public function delete(User $user, ShortLink $shortLink): bool
    {
        return $user->id === $shortLink->user_id;
    }
}
