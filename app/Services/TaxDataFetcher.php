<?php

namespace App\Services;

use App\Models\TaxFile;
use App\Models\TaxAccount;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Exception;

class TaxDataFetcher
{
    private const BASE_URL     = 'https://tax.gov.ua/rahunki-dlya-splati-platejiv';
    private const STORAGE_PATH = 'tax';
//    private const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    private const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36';

    /**
     * Get list of regions from the main tax page.
     */
    public function getRegionsList(): array
    {
        try {
            Log::info('Fetching regions list from tax.gov.ua');

            $url = 'https://tax.gov.ua/rahunki-dlya-splati-platejiv';

// All the other headers go into this associative array
            $headers = [
                'Accept'                    => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Encoding'           => 'gzip, deflate, br, zstd',
                // Guzzle/Laravel handles decompression automatically
                'Accept-Language'           => 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cache-Control'             => 'max-age=0',
                'Cookie'                    => '_ga_DZ3PBM94KG=GS2.1.s1754057683$o2$g0$t1754057683$j60$l0$h0; _ga=GA1.3.355711465.1754038222; _gid=GA1.3.1851109181.1757103838; _ga_T0LC02LFHL=GS2.3.s1757104223$o2$g1$t1757104252$j31$l0$h0; PHPSESSID=o40i5cuf5vb9klh52tn99sacm9; blinded_zoom=1; _gat_UA-179654107-1=1; _ga_09YQ8JQEFR=GS2.3.s1757109068$o3$g1$t1757109704$j60$l0$h0',
                'Priority'                  => 'u=0, i',
                'Sec-Ch-Ua'                 => '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
                'Sec-Ch-Ua-Mobile'          => '?0',
                'Sec-Ch-Ua-Platform'        => '"macOS"',
                'Sec-Fetch-Dest'            => 'document',
                'Sec-Fetch-Mode'            => 'navigate',
                'Sec-Fetch-Site'            => 'none',
                'Sec-Fetch-User'            => '?1',
                'Upgrade-Insecure-Requests' => '1',
                'User-Agent'                => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
                // The 'authority' is used as the 'Host' header, which Laravel's Http client sets automatically from the URL.
            ];

// Make the GET request with the specified headers
            $response = Http::withHeaders($headers)->timeout(30)->get($url);

            if (!$response->successful()) {
                throw new Exception("Failed to fetch regions list. HTTP Status: {$response->status()}");
            }

            $html    = $response->body();
            $regions = $this->parseRegionsFromHtml($html);

            Log::info('Successfully fetched regions list', ['count' => count($regions)]);

            return $regions;
        } catch (Exception $e) {
            Log::error('Error fetching regions list', [
                'error' => $e->getMessage(),
                'url'   => self::BASE_URL
            ]);
            throw $e;
        }
    }

    /**
     * Get Excel file links for a specific region.
     */
    public function getFilesForRegion(string $regionUrl): array
    {
        try {
            Log::info('Fetching files for region', ['url' => $regionUrl]);


            $url = 'https://tax.gov.ua/rahunki-dlya-splati-platejiv';


// All the other headers go into this associative array
            $headers = [

                'Accept'                    => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Encoding'           => 'gzip, deflate, br, zstd',
                // Guzzle/Laravel handles decompression automatically
                'Accept-Language'           => 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cache-Control'             => 'max-age=0',
                'Cookie'                    => '_ga_DZ3PBM94KG=GS2.1.s1754057683$o2$g0$t1754057683$j60$l0$h0; _ga=GA1.3.355711465.1754038222; _gid=GA1.3.1851109181.1757103838; _ga_T0LC02LFHL=GS2.3.s1757104223$o2$g1$t1757104252$j31$l0$h0; PHPSESSID=o40i5cuf5vb9klh52tn99sacm9; blinded_zoom=1; _gat_UA-179654107-1=1; _ga_09YQ8JQEFR=GS2.3.s1757109068$o3$g1$t1757109704$j60$l0$h0',
                'Priority'                  => 'u=0, i',
                'Sec-Ch-Ua'                 => '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
                'Sec-Ch-Ua-Mobile'          => '?0',
                'Sec-Ch-Ua-Platform'        => '"macOS"',
                'Sec-Fetch-Dest'            => 'document',
                'Sec-Fetch-Mode'            => 'navigate',
                'Sec-Fetch-Site'            => 'none',
                'Sec-Fetch-User'            => '?1',
                'Upgrade-Insecure-Requests' => '1',
                'User-Agent'                => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
                // The 'authority' is used as the 'Host' header, which Laravel's Http client sets automatically from the URL.
            ];


            $response = Http::withHeaders($headers)->timeout(30)->get($url);


            if (!$response->successful()) {
                throw new Exception("Failed to fetch region page. HTTP Status: {$response->status()}");
            }

            $html  = $response->body();
            $files = $this->parseExcelLinksFromHtml($html);

            Log::info('Successfully fetched files for region', [
                'url'         => $regionUrl,
                'files_count' => count($files)
            ]);

            return $files;
        } catch (Exception $e) {
            Log::error('Error fetching files for region', [
                'error' => $e->getMessage(),
                'url'   => $regionUrl
            ]);
            throw $e;
        }
    }

    /**
     * Download and save a file to local storage.
     */
    public function downloadFile(string $url, string $region): string
    {
        try {
            Log::info('Downloading file', ['url' => $url, 'region' => $region]);


            $headers = [
                ':authority'                => 'tax.gov.ua',
                ':method'                   => 'GET',
                ':path'                     => '/data/files/506328.xlsx',
                ':scheme'                   => 'https',
                'accept'                    => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-encoding'           => 'gzip, deflate, br, zstd',
                'accept-language'           => 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
                'cookie'                    => '_ga_DZ3PBM94KG=GS2.1.s1754057683$o2$g0$t1754057683$j60$l0$h0; _ga=GA1.3.355711465.1754038222; _gid=GA1.3.1851109181.1757103838; _ga_T0LC02LFHL=GS2.3.s1757104223$o2$g1$t1757104252$j31$l0$h0; PHPSESSID=o40i5cuf5vb9klh52tn99sacm9; blinded_zoom=1; _gat_UA-179654107-1=1; _ga_09YQ8JQEFR=GS2.3.s1757109068$o3$g1$t1757111492$j60$l0$h0',
                'priority'                  => 'u=0, i',
                'referer'                   => 'https://vl.tax.gov.ua/rahunki-dlya-splati-platejiv',
                'sec-ch-ua'                 => '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
                'sec-ch-ua-mobile'          => '?0',
                'sec-ch-ua-platform'        => '"macOS"',
                'sec-fetch-dest'            => 'document',
                'sec-fetch-mode'            => 'navigate',
                'sec-fetch-site'            => 'same-site',
                'sec-fetch-user'            => '?1',
                'upgrade-insecure-requests' => '1',
                'user-agent'                => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
            ];

            $response = Http::withHeaders([
                $headers
            ])->timeout(60)->get($url);

            if (!$response->successful()) {
                throw new Exception("Failed to download file: {$url}. HTTP Status: {$response->status()}");
            }

            $filename = basename(parse_url($url, PHP_URL_PATH));

            $date      = now()->format('Y-m-d');
            $localPath = self::STORAGE_PATH . "/{$region}/{$date}_{$filename}";

            // Ensure directory exists
            $directory = dirname(storage_path('app/' . $localPath));
            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
            }

            Storage::put($localPath, $response->body());

            Log::info('Successfully downloaded file', [
                'url'        => $url,
                'local_path' => $localPath,
                'size'       => strlen($response->body())
            ]);

            return $localPath;
        } catch (Exception $e) {
            Log::error('Error downloading file', [
                'error'  => $e->getMessage(),
                'url'    => $url,
                'region' => $region
            ]);
            throw $e;
        }
    }

    /**
     * Generate MD5 checksum for a file.
     */
    public function getChecksum(string $path): string
    {
        $fullPath = storage_path('app/' . $path);

        if (!file_exists($fullPath)) {
            throw new Exception("File not found: {$fullPath}");
        }

        return md5_file($fullPath);
    }

    /**
     * Parse Excel file and return structured data.
     */
    public function parseFile(string $path): array
    {
        try {
            Log::info('Parsing Excel file', ['path' => $path]);

            $fullPath = storage_path('app/' . $path);

            if (!file_exists($fullPath)) {
                throw new Exception("File not found: {$fullPath}");
            }

            $data       = Excel::toArray([], $fullPath);
            $parsedData = [];

            foreach ($data as $sheetIndex => $sheet) {
                foreach ($sheet as $rowIndex => $row) {
                    // Skip header rows (usually first row)
                    if ($rowIndex === 0) {
                        continue;
                    }

                    // Skip empty rows
                    if (empty(array_filter($row))) {
                        continue;
                    }

                    $parsedData[] = [
                        'payment_code' => $row[0] ?? null,
                        'iban'         => $row[1] ?? null,
                        'receiver'     => $row[2] ?? null,
                        'purpose'      => $row[3] ?? null,
                    ];
                }
            }

            Log::info('Successfully parsed Excel file', [
                'path'          => $path,
                'records_count' => count($parsedData)
            ]);

            return $parsedData;
        } catch (Exception $e) {
            Log::error('Error parsing Excel file', [
                'error' => $e->getMessage(),
                'path'  => $path
            ]);
            throw $e;
        }
    }

    /**
     * Process a region: download, parse, and save to database.
     */
    public function processRegion(string $regionUrl, string $regionName): void
    {
        try {
            Log::info('Processing region', ['name' => $regionName, 'url' => $regionUrl]);

            $files = $this->getFilesForRegion($regionUrl);

            foreach ($files as $fileUrl) {
                $this->processFile($fileUrl, $regionName);
            }

            Log::info('Successfully processed region', ['name' => $regionName]);
        } catch (Exception $e) {
            Log::error('Error processing region', [
                'error' => $e->getMessage(),
                'name'  => $regionName,
                'url'   => $regionUrl
            ]);
            throw $e;
        }
    }

    /**
     * Process a single file: download, parse, and save to database.
     */
    private function processFile(string $fileUrl, string $regionName): void
    {
        try {
            // Download file
            $localPath = $this->downloadFile($fileUrl, $regionName);
            $checksum  = $this->getChecksum($localPath);

            // Check if file already exists with same checksum
            $existingFile = TaxFile::where('region', $regionName)
                ->where('checksum', $checksum)
                ->first();

            if ($existingFile) {
                Log::info('File already exists with same checksum', [
                    'region'   => $regionName,
                    'checksum' => $checksum
                ]);
                return;
            }

            // Parse file
            $parsedData = $this->parseFile($localPath);

            // Save to database
            $taxFile = TaxFile::create([
                'region'     => $regionName,
                'file_url'   => $fileUrl,
                'checksum'   => $checksum,
                'local_path' => $localPath,
                'fetched_at' => now(),
            ]);

            // Save tax accounts
            foreach ($parsedData as $accountData) {
                if (!empty($accountData['payment_code']) && !empty($accountData['iban'])) {
                    TaxAccount::create([
                        'tax_file_id'  => $taxFile->id,
                        'payment_code' => $accountData['payment_code'],
                        'iban'         => $accountData['iban'],
                        'receiver'     => $accountData['receiver'],
                        'purpose'      => $accountData['purpose'],
                    ]);
                }
            }

            Log::info('Successfully processed file', [
                'region'         => $regionName,
                'file_id'        => $taxFile->id,
                'accounts_count' => count($parsedData)
            ]);
        } catch (Exception $e) {
            Log::error('Error processing file', [
                'error'  => $e->getMessage(),
                'url'    => $fileUrl,
                'region' => $regionName
            ]);
            throw $e;
        }
    }

    /**
     * Parse regions from HTML content.
     */
    private function parseRegionsFromHtml(string $html): array
    {
        $regions = [];

        // This is a simplified parser - in reality, you'd need to analyze the actual HTML structure
        // and use a proper HTML parser like DOMDocument or Symfony DomCrawler
        preg_match_all( '/<a\b[^>]*\bclass=["\'][^"\']*activity__link[^"\']*\b[^>]*href=["\']([^"\']*)["\'][^>]*>([^<]+)<\/a>/i', $html, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
            $url  = $match[1];
            $name = trim(strip_tags($match[2]));

            // Filter for region links (this would need to be adjusted based on actual HTML structure)
            if (strpos($url, 'region') !== false || strpos($name, 'область') !== false) {
                $regions[] = [
                    'name' => $name,
                    'url'  => $this->makeAbsoluteUrl($url)
                ];
            }
        }

        return $regions;
    }



    /**
     * Parse Excel file links from HTML content.
     */
    private function parseExcelLinksFromHtml(string $html): array
    {
        $files = [];

        // Look for .xlsx file links
        preg_match_all('/<a[^>]+href=["\']([^"\']*\.xlsx[^"\']*)["\'][^>]*>/i', $html, $matches);

        foreach ($matches[1] as $url) {
            $files[] = $this->makeAbsoluteUrl($url);
        }

        return $files;
    }





    /**
     * Convert relative URL to absolute URL.
     */
    private function makeAbsoluteUrl(string $url): string
    {
        if (strpos($url, 'http') === 0) {
            return $url;
        }

        if (strpos($url, '/') === 0) {
            return 'https://tax.gov.ua' . $url;
        }

        return 'https://tax.gov.ua/' . $url;
    }
}
