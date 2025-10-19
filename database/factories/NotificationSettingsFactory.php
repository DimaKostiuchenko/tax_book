<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NotificationSettings>
 */
class NotificationSettingsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'email_notifications' => fake()->boolean(80), // 80% chance enabled
            'telegram_notifications' => fake()->boolean(30),
            'viber_notifications' => fake()->boolean(20),
            'telegram_connected' => fake()->boolean(25),
            'telegram_chat_id' => fake()->boolean(25) ? 'test_chat_id_' . fake()->randomNumber(5) : null,
            'viber_phone' => fake()->optional(0.2)->numerify('+380##########'),
            'reminder_lead_time' => fake()->randomElements([1, 3, 7], fake()->numberBetween(1, 3)),
        ];
    }

    /**
     * Create settings with all notifications enabled.
     */
    public function allEnabled(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_notifications' => true,
            'telegram_notifications' => true,
            'viber_notifications' => true,
            'telegram_connected' => true,
            'telegram_chat_id' => 'test_chat_id_' . fake()->randomNumber(5),
            'viber_phone' => fake()->numerify('+380##########'),
            'reminder_lead_time' => [7, 3, 1],
        ]);
    }

    /**
     * Create settings with all notifications disabled.
     */
    public function allDisabled(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_notifications' => false,
            'telegram_notifications' => false,
            'viber_notifications' => false,
            'telegram_connected' => false,
            'telegram_chat_id' => null,
            'viber_phone' => null,
            'reminder_lead_time' => [],
        ]);
    }
}