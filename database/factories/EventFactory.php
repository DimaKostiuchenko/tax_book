<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        $year = (int) date('Y');
        $startOfYear = new \DateTime("$year-01-01 00:00:00");
        $endOfYear = new \DateTime("$year-12-31 23:59:59");
        $start = $this->faker->dateTimeBetween($startOfYear, $endOfYear);
        $end = (clone $start)->modify('+10 days');

        return [
            'user_id' => User::factory(),
            'event_type' => $this->faker->randomElement([Event::TYPE_PAYMENT, Event::TYPE_REPORT]),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->optional()->paragraph(),
            'start_date' => $start,
            'end_date' => $end,
            'status' => $this->faker->randomElement([
                Event::STATUS_PENDING,
                Event::STATUS_COMPLETED,
                Event::STATUS_OVERDUE,
            ]),
        ];
    }
}


