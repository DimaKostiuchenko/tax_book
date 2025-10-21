<?php

namespace App\Console\Commands;

use App\Services\TelegramService;
use Illuminate\Console\Command;

class SetTelegramWebhook extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'telegram:set-webhook {--remove : Remove the webhook}';

    /**
     * The console command description.
     */
    protected $description = 'Set or remove Telegram webhook';

    protected TelegramService $telegramService;

    public function __construct(TelegramService $telegramService)
    {
        parent::__construct();
        $this->telegramService = $telegramService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if ($this->option('remove')) {
            $this->info('Removing Telegram webhook...');
            $success = $this->telegramService->removeWebhook();
            
            if ($success) {
                $this->info('Webhook removed successfully');
                return Command::SUCCESS;
            } else {
                $this->error('Failed to remove webhook');
                return Command::FAILURE;
            }
        }

        $this->info('Setting Telegram webhook...');
        $success = $this->telegramService->setWebhook();
        
        if ($success) {
            $this->info('Webhook set successfully');
            
            // Show webhook info
            $info = $this->telegramService->getWebhookInfo();
            if ($info) {
                $this->line('Webhook URL: ' . ($info['url'] ?? 'Not set'));
                $this->line('Pending updates: ' . ($info['pending_update_count'] ?? 0));
            }
            
            return Command::SUCCESS;
        } else {
            $this->error('Failed to set webhook');
            return Command::FAILURE;
        }
    }
}
