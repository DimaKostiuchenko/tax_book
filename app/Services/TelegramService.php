<?php

namespace App\Services;

use App\Models\User;
use App\Models\Event;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Api;

class TelegramService
{
    protected Api $telegram;
    protected string $botToken;
    protected string $webhookUrl;
    protected string $botUsername;

    public function __construct()
    {
        $this->botToken = config('services.telegram.bot_token') ?? '';
        $this->webhookUrl = config('services.telegram.webhook_url') ?? '';
        $this->botUsername = config('services.telegram.bot_username') ?? '';
        
        if (!empty($this->botToken)) {
            $this->telegram = new Api($this->botToken);
        }
    }

    /**
     * Send a message to a Telegram chat
     */
    public function sendMessage(string $chatId, string $text, string $parseMode = 'HTML'): bool
    {
        if (empty($this->botToken) || !isset($this->telegram)) {
            Log::warning('Telegram bot not configured, cannot send message');
            return false;
        }

        try {
            $response = $this->telegram->sendMessage([
                'chat_id' => $chatId,
                'text' => $text,
                'parse_mode' => $parseMode,
            ]);

            Log::info('Telegram message sent successfully', [
                'chat_id' => $chatId,
                'message_id' => $response->getMessageId(),
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send Telegram message', [
                'chat_id' => $chatId,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Set webhook for receiving updates
     */
    public function setWebhook(): bool
    {
        if (empty($this->botToken) || !isset($this->telegram)) {
            Log::warning('Telegram bot not configured, cannot set webhook');
            return false;
        }

        try {
            $response = $this->telegram->setWebhook([
                'url' => $this->webhookUrl,
            ]);

            Log::info('Telegram webhook set successfully', [
                'webhook_url' => $this->webhookUrl,
                'response' => $response,
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to set Telegram webhook', [
                'webhook_url' => $this->webhookUrl,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Remove webhook
     */
    public function removeWebhook(): bool
    {
        if (empty($this->botToken) || !isset($this->telegram)) {
            Log::warning('Telegram bot not configured, cannot remove webhook');
            return false;
        }

        try {
            $response = $this->telegram->removeWebhook();

            Log::info('Telegram webhook removed successfully', [
                'response' => $response,
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to remove Telegram webhook', [
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Get webhook information
     */
    public function getWebhookInfo(): ?array
    {
        if (empty($this->botToken) || !isset($this->telegram)) {
            Log::warning('Telegram bot not configured, cannot get webhook info');
            return null;
        }

        try {
            $response = $this->telegram->getWebhookInfo();
            return $response;
        } catch (\Exception $e) {
            Log::error('Failed to get Telegram webhook info', [
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Send event notification to user
     */
    public function sendEventNotification(User $user, Event $event, string $messageType): bool
    {
        if (!$user->notificationSettings?->telegram_connected || !$user->notificationSettings?->telegram_notifications) {
            return false;
        }

        $message = $this->formatEventMessage($event, $messageType);
        
        return $this->sendMessage(
            $user->notificationSettings->telegram_chat_id,
            $message
        );
    }

    /**
     * Send test notification to user
     */
    public function sendTestNotification(User $user): bool
    {
        if (!$user->notificationSettings?->telegram_connected) {
            return false;
        }

        $message = "🧪 <b>Тестове повідомлення</b>\n\n";
        $message .= "✅ Telegram бот успішно підключено!\n";
        $message .= "📱 Ви будете отримувати сповіщення про події та нагадування.\n\n";
        $message .= "🤖 <i>Tax Book Bot</i>";

        return $this->sendMessage(
            $user->notificationSettings->telegram_chat_id,
            $message
        );
    }

    /**
     * Format event message based on type
     */
    public function formatEventMessage(Event $event, string $messageType): string
    {
        $emoji = $this->getEventEmoji($event->event_type);
        $title = $this->getEventTitle($event);
        $date = $event->start_date->format('d.m.Y H:i');
        
        $message = "{$emoji} <b>{$title}</b>\n\n";
        $message .= "📅 <b>Дата:</b> {$date}\n";
        
        if ($event->description) {
            $message .= "📝 <b>Опис:</b> {$event->description}\n";
        }

        switch ($messageType) {
            case 'reminder':
                $daysLeft = now()->diffInDays($event->start_date, false);
                $message .= "\n⏰ <b>Нагадування:</b> ";
                if ($daysLeft > 0) {
                    $message .= "Залишилось {$daysLeft} днів";
                } else {
                    $message .= "Сьогодні!";
                }
                break;
                
            case 'created':
                $message .= "\n🆕 <b>Нова подія створена</b>";
                break;
                
            case 'updated':
                $message .= "\n✏️ <b>Подія оновлена</b>";
                break;
                
            case 'status_changed':
                $statusText = $this->getStatusText($event->status);
                $message .= "\n🔄 <b>Статус змінено:</b> {$statusText}";
                break;
                
            case 'overdue':
                $message .= "\n🚨 <b>ПРОСРОЧЕНО!</b>";
                break;
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
