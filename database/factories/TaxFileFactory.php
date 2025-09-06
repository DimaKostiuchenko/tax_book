<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TaxFile>
 */
class TaxFileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'region' => $this->faker->city(),
            'file_url' => $this->faker->url(),
            'checksum' => $this->faker->md5(),
            'local_path' => 'tax/' . $this->faker->slug() . '/' . $this->faker->date('Y-m-d') . '_file.xlsx',
            'fetched_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
