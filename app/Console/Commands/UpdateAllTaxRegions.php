<?php

namespace App\Console\Commands;

use App\Jobs\NodeDownloadRegionFIleJob;
use App\Services\TaxDataFetcher;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Exception;
use Symfony\Component\Console\Command\Command as CommandAlias;

class UpdateAllTaxRegions extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'tax:update-regions-tax-data {--region= : Update specific region only}';

    /**
     * The console command description.
     */
    protected $description = 'Update tax payment details for all regions or a specific region';

    /**
     * Execute the console command.
     */
    public function handle(TaxDataFetcher $taxDataFetcher): int
    {
        try {
            $this->info('Starting tax data update process...');
            $regionsToUpdate = $this->getRegionsToUpdate($taxDataFetcher);

            if ($regionsToUpdate->isEmpty()) {
                $this->info('No regions to update.');
                return CommandAlias::SUCCESS;
            }

            $this->processRegions($regionsToUpdate);

            $this->info('All jobs dispatched successfully. They are now processing in the background.');

            return CommandAlias::SUCCESS;
        } catch (Exception $e) {
            $this->error('Tax update process failed: ' . $e->getMessage());
            return CommandAlias::FAILURE;
        }
    }

    /**
     * Get the list of regions to update, filtered by option if necessary.
     */
    private function getRegionsToUpdate(TaxDataFetcher $taxDataFetcher): \Illuminate\Support\Collection
    {
        $specificRegion = $this->option('region');
        $this->info('Fetching regions list...');

        $allRegions = collect($taxDataFetcher->getRegionsList());

        if ($specificRegion) {
            $this->info("Filtering for specific region: {$specificRegion}");
            $regionsToUpdate = $allRegions->filter(
                fn($region) => strtolower($region['name']) === strtolower($specificRegion)
            );

            if ($regionsToUpdate->isEmpty()) {
                throw new Exception("Region '{$specificRegion}' not found.");
            }
        } else {
            $this->info('Found ' . $allRegions->count() . ' regions to update.');
            $regionsToUpdate = $allRegions;
        }

        return $regionsToUpdate;
    }

    /**
     * Dispatch jobs for the given collection of regions with a manual progress bar.
     */
    private function processRegions(Collection $regions): void
    {
        $delayInSeconds = 0;
        $increment      = 5;

        // Create and start the progress bar
        $progressBar = $this->output->createProgressBar($regions->count());
        $progressBar->start();

        foreach ($regions as $region) {
            NodeDownloadRegionFIleJob::dispatch($region['url'], $region['name'])
                ->delay(now()->addSeconds($delayInSeconds));

break;
            // Display a status line below the progress bar
            $this->line("Dispatched job for: {$region['name']}");

            $delayInSeconds += $increment;

            // Advance the progress bar
            $progressBar->advance();
        }

        // Finish the progress bar and move to a new line
        $progressBar->finish();
        $this->newLine();
    }
}
