<?php

namespace Database\Seeders;

use App\Models\PaymentEvent;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;

class PaymentEventSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->latest('id')->first();
        if (!$user) {
            $user = User::factory()->create();
        }

        // Create 5 payment events linked to this user's events
        for ($i = 0; $i < 5; $i++) {
            $event = Event::factory([
                'user_id' => $user->id,
                'event_type' => Event::TYPE_PAYMENT,
            ])->create();

            PaymentEvent::factory()
                ->for($event, 'event')
                ->create();
        }
    }
}


