<?php

namespace Database\Seeders;

use App\Models\PaymentEvent;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class PaymentEventSeeder extends Seeder
{
    public function run(): void
    {
        $year = date('Y');

        $dayStart = 1;
        $dayEnd   = 20;

        $user = User::query()->latest('id')->first();
        if (!$user) {
            $user = User::factory()->create();
        }

        for ($i = 1; $i < 12; $i++) {
            $event = Event::factory([
                'user_id'    => $user->id,
                'event_type' => Event::TYPE_PAYMENT,
                'start_date' => Carbon::createFromDate($year, $i, $dayStart),
                'end_date'   => Carbon::createFromDate($year, $i, $dayEnd),
                'title'      => 'Payment',
            ])->create();

            PaymentEvent::factory()
                ->for($event, 'event')
                ->create();
        }
    }
}


