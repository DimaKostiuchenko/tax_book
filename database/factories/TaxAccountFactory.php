<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TaxAccount>
 */
class TaxAccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tax_file_id' => \App\Models\TaxFile::factory(),
            'payment_code' => $this->faker->numerify('######'),
            'iban' => 'UA' . $this->faker->numerify('##########################'),
            'receiver' => $this->faker->company(),
            'purpose' => $this->faker->sentence(),
        ];
    }
}
