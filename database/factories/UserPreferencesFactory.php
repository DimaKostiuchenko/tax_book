<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserPreferences>
 */
class UserPreferencesFactory extends Factory
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
            'language' => fake()->randomElement(['uk', 'en']),
            'theme' => fake()->randomElement(['light', 'dark', 'system']),
        ];
    }

    /**
     * Create preferences with Ukrainian language.
     */
    public function ukrainian(): static
    {
        return $this->state(fn (array $attributes) => [
            'language' => 'uk',
        ]);
    }

    /**
     * Create preferences with English language.
     */
    public function english(): static
    {
        return $this->state(fn (array $attributes) => [
            'language' => 'en',
        ]);
    }

    /**
     * Create preferences with light theme.
     */
    public function lightTheme(): static
    {
        return $this->state(fn (array $attributes) => [
            'theme' => 'light',
        ]);
    }

    /**
     * Create preferences with dark theme.
     */
    public function darkTheme(): static
    {
        return $this->state(fn (array $attributes) => [
            'theme' => 'dark',
        ]);
    }

    /**
     * Create preferences with system theme.
     */
    public function systemTheme(): static
    {
        return $this->state(fn (array $attributes) => [
            'theme' => 'system',
        ]);
    }
}