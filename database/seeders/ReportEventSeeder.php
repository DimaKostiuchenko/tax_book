<?php

namespace Database\Seeders;

use Illuminate\Support\Carbon;
use App\Models\ReportEvent;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReportEventSeeder extends Seeder
{
    public function run(): void
    {
        $start = Carbon::createFromDate(date('Y'),1,1);
        $end = clone $start;
        $end->addDays(40);

        $user = User::query()->latest('id')->first();
        if (!$user) {
            $user = User::factory()->create();
        }

        $event = Event::factory([
            'user_id'    => $user->id,
            'event_type' => Event::TYPE_REPORT,
            'start_date' => $start,
            'end_date'   => $end,
            'title'   => 'Report',
        ])->create();

        ReportEvent::factory()
            ->for($event, 'event')
            ->create();
    }
}


