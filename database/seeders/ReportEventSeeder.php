<?php

namespace Database\Seeders;

use App\Models\ReportEvent;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReportEventSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->latest('id')->first();
        if (!$user) {
            $user = \App\Models\User::factory()->create();
        }

        // Create 4 report events linked to this user's events
        for ($i = 0; $i < 4; $i++) {
            $event = Event::factory([
                'user_id' => $user->id,
                'event_type' => Event::TYPE_REPORT,
            ])->create();

            ReportEvent::factory()
                ->for($event, 'event')
                ->create();
        }
    }
}


