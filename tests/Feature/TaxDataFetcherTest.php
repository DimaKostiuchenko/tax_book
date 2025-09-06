<?php

use App\Models\TaxAccount;
use App\Models\TaxFile;
use App\Services\TaxDataFetcher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    Storage::fake('local');
});

test('can get regions list', function () {
    Http::fake([
        'tax.gov.ua/*' => Http::response('<html><body><a href="/region1">Region 1</a><a href="/region2">Region 2</a></body></html>', 200)
    ]);

    $fetcher = new TaxDataFetcher();
    $regions = $fetcher->getRegionsList();

    expect($regions)->toBeArray();
    expect($regions)->not->toBeEmpty();
});

test('can download and parse file', function () {
    // Create a mock Excel file content
    $mockExcelContent = "Payment Code,IBAN,Receiver,Purpose\n123456,UA1234567890123456789012345,Test Receiver,Test Purpose";
    
    Http::fake([
        'tax.gov.ua/*' => Http::response($mockExcelContent, 200, ['Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])
    ]);

    $fetcher = new TaxDataFetcher();
    
    // Test file download
    $localPath = $fetcher->downloadFile('https://tax.gov.ua/test.xlsx', 'test-region');
    
    expect($localPath)->toBeString();
    expect(Storage::exists($localPath))->toBeTrue();
    
    // Test checksum generation
    $checksum = $fetcher->getChecksum($localPath);
    expect($checksum)->toBeString();
    expect(strlen($checksum))->toBe(32); // MD5 hash length
});

test('can process region and save to database', function () {
    Http::fake([
        'tax.gov.ua/*' => Http::response('<html><body><a href="https://tax.gov.ua/test.xlsx">Test File</a></body></html>', 200)
    ]);

    // Mock Excel file content
    $mockExcelContent = "Payment Code,IBAN,Receiver,Purpose\n123456,UA1234567890123456789012345,Test Receiver,Test Purpose";
    
    Http::fake([
        'tax.gov.ua/test.xlsx' => Http::response($mockExcelContent, 200)
    ]);

    $fetcher = new TaxDataFetcher();
    
    // Process the region
    $fetcher->processRegion('https://tax.gov.ua/region', 'test-region');
    
    // Check that data was saved to database
    $taxFile = TaxFile::where('region', 'test-region')->first();
    expect($taxFile)->not->toBeNull();
    expect($taxFile->region)->toBe('test-region');
    
    $taxAccount = TaxAccount::where('tax_file_id', $taxFile->id)->first();
    expect($taxAccount)->not->toBeNull();
    expect($taxAccount->payment_code)->toBe('123456');
});

test('handles network errors gracefully', function () {
    Http::fake([
        'tax.gov.ua/*' => Http::response('', 500)
    ]);

    $fetcher = new TaxDataFetcher();
    
    expect(fn() => $fetcher->getRegionsList())
        ->toThrow(Exception::class);
});

test('prevents duplicate file processing', function () {
    // Create existing tax file
    $existingFile = TaxFile::factory()->create([
        'region' => 'test-region',
        'checksum' => 'test-checksum'
    ]);

    Http::fake([
        'tax.gov.ua/*' => Http::response('<html><body><a href="https://tax.gov.ua/test.xlsx">Test File</a></body></html>', 200)
    ]);

    // Mock the same file content to generate same checksum
    $mockExcelContent = "Payment Code,IBAN,Receiver,Purpose\n123456,UA1234567890123456789012345,Test Receiver,Test Purpose";
    
    Http::fake([
        'tax.gov.ua/test.xlsx' => Http::response($mockExcelContent, 200)
    ]);

    $fetcher = new TaxDataFetcher();
    
    // Process the region - should not create duplicate
    $fetcher->processRegion('https://tax.gov.ua/region', 'test-region');
    
    // Should still have only one file
    $fileCount = TaxFile::where('region', 'test-region')->count();
    expect($fileCount)->toBe(1);
});
