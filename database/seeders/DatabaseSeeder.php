<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\PaymentEventSeeder;
use Database\Seeders\ReportEventSeeder;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Ensure the demo user exists without violating unique constraints on re-seed
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ];

        User::query()->firstOrCreate([
            'email' => 'test@example.com',
        ], $userData);

        $this->call([
            PaymentEventSeeder::class,
            ReportEventSeeder::class,
        ]);
    }
}
