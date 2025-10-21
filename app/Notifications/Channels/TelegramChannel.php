<?php

namespace App\Notifications\Channels;

use App\Services\TelegramService;
use Illuminate\Notifications\Notification;

class TelegramChannel
{
    protected TelegramService $telegramService;

    public function __construct(TelegramService $telegramService)
    {
        $this->telegramService = $telegramService;
    }

    /**
     * Send the given notification.
     */
    public function send($notifiable, Notification $notification)
    {
        if (!$notifiable->notificationSettings?->telegram_connected) {
            return false;
        }

        $message = $notification->toTelegram($notifiable);
        
        return $this->telegramService->sendMessage(
            $notifiable->notificationSettings->telegram_chat_id,
            $message
        );
    }
}
