<?php

namespace Database\Seeders;

use App\Models\ReportEvent;
use Illuminate\Database\Seeder;

class ReportEventSeeder extends Seeder
{
    public function run(): void
    {
        ReportEvent::factory()->count(4)->create();
    }
}


