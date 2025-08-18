<?php

namespace Database\Seeders;

use App\Models\PaymentEvent;
use Illuminate\Database\Seeder;

class PaymentEventSeeder extends Seeder
{
    public function run(): void
    {
        PaymentEvent::factory()->count(5)->create();
    }
}


