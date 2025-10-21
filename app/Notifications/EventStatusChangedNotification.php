<?php

namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class EventStatusChangedNotification extends TelegramNotification
{
    protected Event $event;
    protected string $oldStatus;
    protected string $newStatus;

    /**
     * Create a new notification instance.
     */
    public function __construct(Event $event, string $oldStatus, string $newStatus)
    {
        $this->event = $event;
        $this->oldStatus = $oldStatus;
        $this->newStatus = $newStatus;
    }

    /**
     * Get the Telegram representation of the notification.
     */
    public function toTelegram(object $notifiable): string
    {
        $emoji = $this->getEventEmoji($this->event->event_type);
        $title = $this->getEventTitle($this->event);
        $date = $this->event->start_date->format('d.m.Y H:i');
        
        $message = "🔄 <b>СТАТУС ЗМІНЕНО</b>\n\n";
        $message .= "{$emoji} <b>{$title}</b>\n";
        $message .= "📅 <b>Дата:</b> {$date}\n";
        
        if ($this->event->description) {
            $message .= "📝 <b>Опис:</b> {$this->event->description}\n";
        }

        $oldStatusText = $this->getStatusText($this->oldStatus);
        $newStatusText = $this->getStatusText($this->newStatus);
        
        $message .= "\n🔄 <b>Статус:</b> {$oldStatusText} → {$newStatusText}";
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

    /**
     * Get status text in Ukrainian
     */
    private function getStatusText(string $status): string
    {
        return match ($status) {
            Event::STATUS_PENDING => 'Очікує',
            Event::STATUS_COMPLETED => 'Виконано',
            Event::STATUS_OVERDUE => 'Прострочено',
            default => $status,
        };
    }
}
