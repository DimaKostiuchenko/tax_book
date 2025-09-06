<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Log;
use Exception;
class NodeDownloadRegionFIleJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The maximum number of seconds the job can run.
     */
    public int $timeout = 300;

    /**
     * @param string $url
     * @param string $regionName
     */
    public function __construct(public string $regionUrl,  public string $regionName)
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(): void
    {
        Log::info("Starting download job for URL: {$this->url}");

        // Use Laravel's Process facade to execute the Node.js script.
        // The first argument is the path to the node executable, the second is the script path,
        // and the third is the URL to be passed as an argument to the script.
        $process = Process::path(base_path('node_scripts/xlsx_downloader'))
            ->run(['node', 'run-downloader.js', $this->url]);

        // Check if the process was successful.
        if ($process->failed()) {
            Log::error("Playwright script failed for URL: {$this->url}");
            Log::error("Error Output: " . $process->errorOutput());
        } else {
            Log::info("Playwright script executed successfully for URL: {$this->url}");
            Log::info("Script Output: " . $process->output());
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
