<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserProfile>
 */
class UserProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userType = fake()->randomElement(['fop', 'legal_entity']);
        
        return [
            'user_id' => User::factory(),
            'user_type' => $userType,
            'tin' => $userType === 'fop' ? fake()->numerify('##########') : null,
            'edrpou' => $userType === 'legal_entity' ? fake()->numerify('########') : null,
            'tax_regime' => fake()->randomElement(['single_tax_1', 'single_tax_2', 'single_tax_3', 'general_system']),
            'vat_payer' => fake()->boolean(30), // 30% chance of being VAT payer
            'vat_number' => fake()->boolean(30) ? fake()->numerify('##########') : null,
            'reporting_period' => fake()->randomElement(['monthly', 'quarterly', 'yearly']),
            'phone' => fake()->optional(0.8)->numerify('+380##########'),
        ];
    }

    /**
     * Create a FOP profile.
     */
    public function fop(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_type' => 'fop',
            'tin' => fake()->numerify('##########'),
            'edrpou' => null,
        ]);
    }

    /**
     * Create a legal entity profile.
     */
    public function legalEntity(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_type' => 'legal_entity',
            'tin' => null,
            'edrpou' => fake()->numerify('########'),
        ]);
    }

    /**
     * Create a VAT payer profile.
     */
    public function vatPayer(): static
    {
        return $this->state(fn (array $attributes) => [
            'vat_payer' => true,
            'vat_number' => fake()->numerify('##########'),
        ]);
    }
}