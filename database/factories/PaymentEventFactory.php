<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\PaymentEvent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PaymentEvent>
 */
class PaymentEventFactory extends Factory
{
    protected $model = PaymentEvent::class;

    public function definition(): array
    {
        return [
            'event_id' => Event::factory([ 'event_type' => Event::TYPE_PAYMENT ]),
            'amount' => $this->faker->randomFloat(2, 100, 50000),
            'paid_at' => $this->faker->optional()->dateTimeBetween('-1 month', 'now'),
            'transaction_id' => $this->faker->optional()->uuid(),
        ];
    }
}


