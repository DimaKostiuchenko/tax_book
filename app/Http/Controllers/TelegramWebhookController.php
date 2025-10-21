<?php

namespace App\Http\Controllers;

use App\Services\TelegramConnectionService;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class TelegramWebhookController extends Controller
{
    protected TelegramConnectionService $connectionService;
    protected TelegramService $telegramService;

    public function __construct(
        TelegramConnectionService $connectionService,
        TelegramService $telegramService
    ) {
        $this->connectionService = $connectionService;
        $this->telegramService = $telegramService;
    }

    /**
     * Handle incoming Telegram webhook updates
     */
    public function handle(Request $request): JsonResponse
    {
        try {
            $update = $request->all();
            
            Log::info('Telegram webhook received', [
                'update_id' => $update['update_id'] ?? null,
                'type' => $this->getUpdateType($update),
            ]);

            // Handle message updates
            if (isset($update['message'])) {
                $this->handleMessage($update['message']);
            }

            return response()->json(['ok' => true]);
        } catch (\Exception $e) {
            Log::error('Telegram webhook error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['ok' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Handle message updates
     */
    protected function handleMessage(array $message): void
    {
        $text = $message['text'] ?? '';
        $chatId = $message['chat']['id'];
        $from = $message['from'];

        Log::info('Telegram message received', [
            'chat_id' => $chatId,
            'user_id' => $from['id'] ?? null,
            'username' => $from['username'] ?? null,
            'text' => $text,
        ]);

        // Handle /start command with token
        if (str_starts_with($text, '/start')) {
            $this->handleStart($message);
        } else {
            $this->handleUnknownCommand($message);
        }
    }

    /**
     * Handle /start command
     */
    protected function handleStart(array $message): void
    {
        $text = $message['text'];
        $chatId = $message['chat']['id'];
        $telegramUserId = (string) $message['from']['id'];

        // Extract token from /start command
        $token = trim(str_replace('/start', '', $text));

        if (empty($token)) {
            $this->sendWelcomeMessage($chatId);
            return;
        }

        // Verify connection
        $success = $this->connectionService->verifyConnection($telegramUserId, $token);

        if ($success) {
            $this->sendConnectionSuccessMessage($chatId);
        } else {
            $this->sendConnectionErrorMessage($chatId);
        }
    }

    /**
     * Handle unknown commands
     */
    protected function handleUnknownCommand(array $message): void
    {
        $chatId = $message['chat']['id'];
        
        $response = "🤖 <b>Tax Book Bot</b>\n\n";
        $response .= "Я можу тільки відправляти сповіщення про ваші податкові події.\n\n";
        $response .= "Для підключення до системи використовуйте посилання з веб-сайту.\n\n";
        $response .= "📱 <i>Підтримка: support@taxbook.com</i>";

        $this->telegramService->sendMessage($chatId, $response);
    }

    /**
     * Send welcome message for /start without token
     */
    protected function sendWelcomeMessage(string $chatId): void
    {
        $message = "👋 <b>Вітаємо в Tax Book Bot!</b>\n\n";
        $message .= "Для підключення до системи сповіщень:\n";
        $message .= "1️⃣ Перейдіть на сайт Tax Book\n";
        $message .= "2️⃣ Увійдіть в свій акаунт\n";
        $message .= "3️⃣ Перейдіть в налаштування сповіщень\n";
        $message .= "4️⃣ Натисніть 'Підключити Telegram'\n\n";
        $message .= "📱 <i>Tax Book Bot</i>";

        $this->telegramService->sendMessage($chatId, $message);
    }

    /**
     * Send connection success message
     */
    protected function sendConnectionSuccessMessage(string $chatId): void
    {
        $message = "✅ <b>Підключення успішне!</b>\n\n";
        $message .= "Тепер ви будете отримувати сповіщення про:\n";
        $message .= "• 📅 Нагадування про події\n";
        $message .= "• 🔄 Зміни статусу\n";
        $message .= "• 🆕 Нові події\n";
        $message .= "• 🚨 Прострочені завдання\n\n";
        $message .= "Для відключення перейдіть в налаштування на сайті.\n\n";
        $message .= "🤖 <i>Tax Book Bot</i>";

        $this->telegramService->sendMessage($chatId, $message);
    }

    /**
     * Send connection error message
     */
    protected function sendConnectionErrorMessage(string $chatId): void
    {
        $message = "❌ <b>Помилка підключення</b>\n\n";
        $message .= "Токен недійсний або прострочений.\n";
        $message .= "Спробуйте згенерувати нове посилання на сайті.\n\n";
        $message .= "📱 <i>Tax Book Bot</i>";

        $this->telegramService->sendMessage($chatId, $message);
    }

    /**
     * Get update type for logging
     */
    protected function getUpdateType(array $update): string
    {
        if (isset($update['message'])) {
            return 'message';
        }
        if (isset($update['callback_query'])) {
            return 'callback_query';
        }
        if (isset($update['inline_query'])) {
            return 'inline_query';
        }
        
        return 'unknown';
    }
}
