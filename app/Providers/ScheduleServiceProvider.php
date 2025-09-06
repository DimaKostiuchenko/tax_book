<?php

namespace App\Providers;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\ServiceProvider;

class ScheduleServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->booted(function () {
            $schedule = $this->app->make(Schedule::class);
            
            // Schedule tax data updates to run daily at 3:00 AM
            $schedule->command('tax:update-all')
                ->dailyAt('03:00')
                ->withoutOverlapping()
                ->runInBackground()
                ->appendOutputTo(storage_path('logs/tax-update-schedule.log'));
            
            // Optional: Schedule a weekly cleanup of old files
            $schedule->command('tax:cleanup')
                ->weekly()
                ->sundays()
                ->at('02:00')
                ->withoutOverlapping();
        });
    }
}
