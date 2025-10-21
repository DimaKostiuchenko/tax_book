<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Models\User;
use App\Notifications\EventReminderNotification;
use App\Notifications\EventOverdueNotification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class SendEventReminders extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'notifications:send-reminders';

    /**
     * The console command description.
     */
    protected $description = 'Send event reminder notifications to users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting event reminder notifications...');

        $reminderCount = 0;
        $overdueCount = 0;

        // Get all users with notification settings
        $users = User::with('notificationSettings')->get();

        foreach ($users as $user) {
            if (!$user->notificationSettings) {
                continue;
            }

            $settings = $user->notificationSettings;
            $reminderDays = $settings->getReminderLeadTime();

            // Get user's events
            $events = Event::where('user_id', $user->id)
                ->where('status', Event::STATUS_PENDING)
                ->get();

            foreach ($events as $event) {
                $daysUntilEvent = now()->diffInDays($event->start_date, false);

                // Check for overdue events
                if ($daysUntilEvent < 0) {
                    $overdueDays = abs($daysUntilEvent);
                    $user->notify(new EventOverdueNotification($event, $overdueDays));
                    $overdueCount++;
                    $this->line("Overdue notification sent for event: {$event->title}");
                }
                // Check for reminder days
                elseif (in_array($daysUntilEvent, $reminderDays)) {
                    $user->notify(new EventReminderNotification($event, $daysUntilEvent));
                    $reminderCount++;
                    $this->line("Reminder sent for event: {$event->title} ({$daysUntilEvent} days)");
                }
            }
        }

        $this->info("Reminder notifications sent: {$reminderCount}");
        $this->info("Overdue notifications sent: {$overdueCount}");

        Log::info('Event reminders processed', [
            'reminder_count' => $reminderCount,
            'overdue_count' => $overdueCount,
        ]);

        return Command::SUCCESS;
    }
}
