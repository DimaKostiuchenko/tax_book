<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\ReportEvent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ReportEvent>
 */
class ReportEventFactory extends Factory
{
    protected $model = ReportEvent::class;

    public function definition(): array
    {
        return [
            'event_id' => Event::factory([ 'event_type' => Event::TYPE_REPORT ]),
            'file_path' => $this->faker->optional()->filePath(),
            'submitted_at' => $this->faker->optional()->dateTimeBetween('-1 month', 'now'),
            'reference_no' => $this->faker->optional()->bothify('REF-########'),
        ];
    }
}


