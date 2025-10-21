<?php

namespace App\Console\Commands;

use App\Services\TelegramConnectionService;
use Illuminate\Console\Command;

class CleanupTelegramTokens extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'telegram:cleanup-tokens';

    /**
     * The console command description.
     */
    protected $description = 'Clean up expired Telegram connection tokens';

    protected TelegramConnectionService $connectionService;

    public function __construct(TelegramConnectionService $connectionService)
    {
        parent::__construct();
        $this->connectionService = $connectionService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Cleaning up expired Telegram connection tokens...');

        $deletedCount = $this->connectionService->cleanExpiredTokens();

        $this->info("Cleaned up {$deletedCount} expired tokens");

        return Command::SUCCESS;
    }
}
