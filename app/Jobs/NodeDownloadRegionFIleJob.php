<?php

namespace App\Jobs;

use App\Models\TaxFile;
use Exception;
use App\Models\DataItem;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;

class NodeDownloadRegionFIleJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 1;
    public int $timeout = 100;

    public function __construct(public string $regionUrl, public string $regionName)
    {
    }

    public function handle(): void
    {
        Log::info("Starting download for region: {$this->regionName}");

        $process = Process::path(base_path('node_scripts/xlsx_downloader'))
            ->run(['node', 'run-downloader.js', $this->regionUrl]);

        if ($process->failed()) {
            throw new Exception("Playwright script failed: " . $process->errorOutput());
        }

        // Call the new, cleaner method to get the data
        $data = $this->getDecodedJsonOutput($process->output());

        $this->saveToDatabase($data);

        Log::info("Download and database save successful for region: {$this->regionName}");
    }

    /**
     * Decode the JSON output from the process and validate it.
     *
     * @param string $jsonString
     * @return array
     * @throws Exception
     */
    private function getDecodedJsonOutput(string $jsonString): array
    {
        $lines    = array_filter((explode("\n", trim($jsonString))));
        $jsonLine = trim(end($lines));

        Log::error('____________________LINE____________________:', ['json_line' => $jsonLine]);

        $data     = json_decode($jsonLine, true);



        if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
            Log::error('Invalid JSON output. Full output:', ['output' => $jsonString]);
            throw new Exception('Invalid JSON output from Node.js script.');
        }

        return $data;
    }

    private function saveToDatabase(array $data): void
    {
        foreach ($data as $item) {
            TaxFile::query()->create([
                'region'     => $this->regionName,
                'page_url'   => $this->regionUrl,
                'file_url'   => Arr::get($item, 'file_url'),
                'local_path'  => Arr::get($item, 'file_path'),
                'link_title' => Arr::get($item, 'link_title'),
                'checksum'   => md5_file(Arr::get($item, 'file_path')),
                'fetched_at' => now(),
            ]);
        }
    }

    public function failed(Exception $exception): void
    {
        Log::error('Region download job permanently failed', [
            'region_name' => $this->regionName,
            'region_url'  => $this->regionUrl,
            'error'       => $exception->getMessage(),
            'job_id'      => $this->job?->getJobId()
        ]);
    }
}
