<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule commands
Schedule::command('notifications:send-reminders')
    ->dailyAt('09:00')
    ->timezone('Europe/Kiev');

Schedule::command('telegram:cleanup-tokens')
    ->hourly();
