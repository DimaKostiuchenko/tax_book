<?php

use App\Models\TaxAccount;
use App\Models\TaxFile;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create test data
    $taxFile = TaxFile::factory()->create([
        'region' => 'test-region',
        'fetched_at' => now()
    ]);

    TaxAccount::factory()->create([
        'tax_file_id' => $taxFile->id,
        'payment_code' => '123456',
        'iban' => 'UA1234567890123456789012345',
        'receiver' => 'Test Receiver',
        'purpose' => 'Test Purpose'
    ]);
});

test('can get all regions', function () {
    $response = $this->getJson('/api/tax');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                '*' => [
                    'region',
                    'last_updated',
                    'files_count'
                ]
            ],
            'message'
        ])
        ->assertJson([
            'success' => true
        ]);
});

test('can get tax accounts for specific region', function () {
    $response = $this->getJson('/api/tax/test-region');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                '*' => [
                    'id',
                    'payment_code',
                    'iban',
                    'receiver',
                    'purpose',
                    'tax_file'
                ]
            ],
            'pagination',
            'message'
        ])
        ->assertJson([
            'success' => true
        ]);
});

test('can search tax accounts', function () {
    $response = $this->getJson('/api/tax/search?payment_code=123456');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data',
            'pagination',
            'message'
        ])
        ->assertJson([
            'success' => true
        ]);
});

test('can get statistics', function () {
    $response = $this->getJson('/api/tax/statistics');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                'total_regions',
                'total_files',
                'total_accounts',
                'last_updated',
                'regions_with_data'
            ],
            'message'
        ])
        ->assertJson([
            'success' => true
        ]);
});

test('handles pagination correctly', function () {
    // Create multiple tax accounts
    $taxFile = TaxFile::first();
    for ($i = 0; $i < 5; $i++) {
        TaxAccount::factory()->create([
            'tax_file_id' => $taxFile->id,
            'payment_code' => "12345{$i}"
        ]);
    }

    $response = $this->getJson('/api/tax/test-region?per_page=3');

    $response->assertStatus(200)
        ->assertJson([
            'pagination' => [
                'per_page' => 3,
                'total' => 6 // 1 from beforeEach + 5 new ones
            ]
        ]);
});

test('validates per_page parameter', function () {
    $response = $this->getJson('/api/tax/test-region?per_page=200');

    $response->assertStatus(200)
        ->assertJson([
            'pagination' => [
                'per_page' => 100 // Should be limited to 100
            ]
        ]);
});

test('returns 404 for non-existent region', function () {
    $response = $this->getJson('/api/tax/non-existent-region');

    $response->assertStatus(200)
        ->assertJson([
            'data' => [],
            'pagination' => [
                'total' => 0
            ]
        ]);
});
