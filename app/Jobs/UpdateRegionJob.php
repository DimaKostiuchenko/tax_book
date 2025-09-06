<?php

namespace App\Jobs;

use App\Services\TaxDataFetcher;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Exception;

class UpdateRegionJob implements ShouldQueue
{
    use Queueable;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The maximum number of seconds the job can run.
     */
    public int $timeout = 300;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $regionUrl,
        public string $regionName
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(TaxDataFetcher $taxDataFetcher): void
    {
        try {
            Log::info('Starting region update job', [
                'region_name' => $this->regionName,
                'region_url' => $this->regionUrl,
                'job_id' => $this->job?->getJobId()
            ]);

            $taxDataFetcher->processRegion($this->regionUrl, $this->regionName);

            Log::info('Successfully completed region update job', [
                'region_name' => $this->regionName,
                'job_id' => $this->job?->getJobId()
            ]);

        } catch (Exception $e) {
            Log::error('Region update job failed', [
                'region_name' => $this->regionName,
                'region_url' => $this->regionUrl,
                'error' => $e->getMessage(),
                'job_id' => $this->job?->getJobId()
            ]);

            // Re-throw the exception to mark the job as failed
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(?Exception $exception): void
    {
        Log::error('Region update job permanently failed', [
            'region_name' => $this->regionName,
            'region_url' => $this->regionUrl,
            'error' => $exception?->getMessage(),
            'job_id' => $this->job?->getJobId()
        ]);
    }
}
