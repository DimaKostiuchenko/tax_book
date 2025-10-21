<?php

namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class EventOverdueNotification extends TelegramNotification
{
    protected Event $event;
    protected int $daysOverdue;

    /**
     * Create a new notification instance.
     */
    public function __construct(Event $event, int $daysOverdue = 0)
    {
        $this->event = $event;
        $this->daysOverdue = $daysOverdue;
    }

    /**
     * Get the Telegram representation of the notification.
     */
    public function toTelegram(object $notifiable): string
    {
        $emoji = $this->getEventEmoji($this->event->event_type);
        $title = $this->getEventTitle($this->event);
        $date = $this->event->start_date->format('d.m.Y H:i');
        
        $message = "🚨 <b>ПРОСРОЧЕНО!</b>\n\n";
        $message .= "{$emoji} <b>{$title}</b>\n";
        $message .= "📅 <b>Дата:</b> {$date}\n";
        
        if ($this->event->description) {
            $message .= "📝 <b>Опис:</b> {$this->event->description}\n";
        }

        if ($this->daysOverdue > 0) {
            $message .= "\n🚨 <b>Прострочено на:</b> {$this->daysOverdue} днів";
        } else {
            $message .= "\n🚨 <b>Прострочено сьогодні!</b>";
        }

        $message .= "\n\n🤖 <i>Tax Book Bot</i>";

        return $message;
    }

    /**
     * Get emoji for event type
     */
    private function getEventEmoji(string $eventType): string
    {
        return match ($eventType) {
            Event::TYPE_PAYMENT => '💰',
            Event::TYPE_REPORT => '📊',
            default => '📅',
        };
    }

    /**
     * Get formatted event title
     */
    private function getEventTitle(Event $event): string
    {
        return match ($event->event_type) {
            Event::TYPE_PAYMENT => "Сплата податку: {$event->title}",
            Event::TYPE_REPORT => "Звіт: {$event->title}",
            default => $event->title,
        };
    }
}
