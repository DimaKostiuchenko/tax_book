<?php

namespace App\Console\Commands;

use App\Jobs\UpdateRegionJob;
use App\Services\TaxDataFetcher;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Exception;

class UpdateAllTaxRegions extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'tax:update-all
                            {--region= : Update specific region only}
                            {--force : Force update even if files exist}';

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

            $specificRegion = $this->option('region');
            $force = $this->option('force');

            if ($specificRegion) {
                $this->info("Updating specific region: {$specificRegion}");
                return $this->updateSpecificRegion($taxDataFetcher, $specificRegion, $force);
            } else {
                $this->info('Updating all regions...');
                return $this->updateAllRegions($taxDataFetcher, $force);
            }

        } catch (Exception $e) {
            $this->error('Tax update process failed: ' . $e->getMessage());
            Log::error('Tax update command failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return Command::FAILURE;
        }
    }

    /**
     * Update all regions by dispatching jobs.
     */
    private function updateAllRegions(TaxDataFetcher $taxDataFetcher,$force): int
    {
        try {
            $this->info('Fetching regions list...');
            $regions = $taxDataFetcher->getRegionsList();

            if (empty($regions)) {
                $this->warn('No regions found to update.');
                return Command::SUCCESS;
            }

            $this->info("Found " . count($regions) . " regions to update.");

            $progressBar = $this->output->createProgressBar(count($regions));
            $progressBar->start();

            $delayInSeconds = 0;
            $dispatchedJobs = 0;
            $increment = 5;
            foreach ($regions as $region) {
                try {
                    UpdateRegionJob::dispatch($region['url'], $region['name']);
                    UpdateRegionJob::dispatch($region['url'], $region['name'])
                        ->delay(now()->addSeconds($delayInSeconds));


                    // Increment the delay for the next job
                    $delayInSeconds += $increment;

                    $dispatchedJobs++;

                    $this->line("\nDispatched job for region: {$region['name']}");

                } catch (Exception $e) {
                    $this->error("\nFailed to dispatch job for region {$region['name']}: " . $e->getMessage());
                    Log::error('Failed to dispatch region job', [
                        'region' => $region,
                        'error' => $e->getMessage()
                    ]);
                }

                $progressBar->advance();
            }

            $progressBar->finish();
            $this->newLine();

            $this->info("Successfully dispatched {$dispatchedJobs} jobs out of " . count($regions) . " regions.");
            $this->info('Jobs are now processing in the background. Check logs for progress.');

            return Command::SUCCESS;

        } catch (Exception $e) {
            $this->error('Failed to update all regions: ' . $e->getMessage());
            Log::error('Failed to update all regions', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return Command::FAILURE;
        }
    }

    /**
     * Update a specific region.
     */
    private function updateSpecificRegion(TaxDataFetcher $taxDataFetcher, string $regionName, bool $force): int
    {
        try {
            $this->info("Processing region: {$regionName}");

            // For specific region, we need to find the URL
            // This is a simplified approach - in reality, you might want to store region URLs in database
            $regions = $taxDataFetcher->getRegionsList();
            $targetRegion = null;

            foreach ($regions as $region) {
                if (strtolower($region['name']) === strtolower($regionName)) {
                    $targetRegion = $region;
                    break;
                }
            }

            if (!$targetRegion) {
                $this->error("Region '{$regionName}' not found.");
                return Command::FAILURE;
            }

            $this->info("Found region URL: {$targetRegion['url']}");

            // Process the region directly (not via queue for immediate feedback)
            $taxDataFetcher->processRegion($targetRegion['url'], $targetRegion['name']);

            $this->info("Successfully updated region: {$regionName}");

            return Command::SUCCESS;

        } catch (Exception $e) {
            $this->error("Failed to update region '{$regionName}': " . $e->getMessage());
            Log::error('Failed to update specific region', [
                'region' => $regionName,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return Command::FAILURE;
        }
    }
}
