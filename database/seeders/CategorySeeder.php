<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Yoga',
                'icon' => 'FaMountain',
            ],
            [
                'name' => 'Meditation',
                'icon' => 'FaMountain',
            ],
            [
                'name' => 'Home Stay',
                'icon' => 'FaMountain',
            ],
            [
                'name' => 'Heli Tour',
                'icon' => 'FaHelicopter',
            ],
            [
                'name' => 'Hiking',
                'icon' => 'FaMountain',
            ],
            [
                'name' => 'Trek',
                'icon' => 'FaMountain',
            ],
            [
                'name' => 'Tour',
                'icon' => 'FaMountain',
            ],
           
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
