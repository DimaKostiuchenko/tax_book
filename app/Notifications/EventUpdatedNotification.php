<?php

namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class EventUpdatedNotification extends TelegramNotification
{
    protected Event $event;
    protected array $changes;

    /**
     * Create a new notification instance.
     */
    public function __construct(Event $event, array $changes)
    {
        $this->event = $event;
        $this->changes = $changes;
    }

    /**
     * Get the Telegram representation of the notification.
     */
    public function toTelegram(object $notifiable): string
    {
        $emoji = $this->getEventEmoji($this->event->event_type);
        $title = $this->getEventTitle($this->event);
        $date = $this->event->start_date->format('d.m.Y H:i');
        
        $message = "✏️ <b>ПОДІЯ ОНОВЛЕНА</b>\n\n";
        $message .= "{$emoji} <b>{$title}</b>\n";
        $message .= "📅 <b>Дата:</b> {$date}\n";
        
        if ($this->event->description) {
            $message .= "📝 <b>Опис:</b> {$this->event->description}\n";
        }

        $message .= "\n✏️ <b>Зміни:</b> ";
        $changeTexts = [];
        
        foreach ($this->changes as $field => $value) {
            $fieldName = $this->getFieldName($field);
            $changeTexts[] = "{$fieldName}: {$value}";
        }
        
        $message .= implode(', ', $changeTexts);
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
     * Get field name in Ukrainian
     */
    private function getFieldName(string $field): string
    {
        return match ($field) {
            'title' => 'Назва',
            'description' => 'Опис',
            'start_date' => 'Дата початку',
            'end_date' => 'Дата закінчення',
            'status' => 'Статус',
            default => $field,
        };
    }
}
