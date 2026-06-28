<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContentSeeder extends Seeder
{

    public function run(): void
    {
        // Alphabet
        $letters = range('A', 'Z');
        $words = ['A' => 'Avion', 'B' => 'Ballon', 'C' => 'Chat', 'D' => 'Dauphin', 'E' => 'Éléphant', 'F' => 'Fleur', 'G' => 'Grenouille', 'H' => 'Hibou', 'I' => 'Igloo', 'J' => 'Jouet', 'K' => 'Kiwi', 'L' => 'Lion', 'M' => 'Maison', 'N' => 'Nuage', 'O' => 'Oiseau', 'P' => 'Pomme', 'Q' => 'Quille', 'R' => 'Robot', 'S' => 'Soleil', 'T' => 'Tortue', 'U' => 'Usine', 'V' => 'Voiture', 'W' => 'Wagon', 'X' => 'Xylophone', 'Y' => 'Yaourt', 'Z' => 'Zèbre'];
        foreach ($letters as $l) {
            $lo = strtolower($l);
            DB::table('alphabets')->insert([
                'letter_uppercase' => $l,
                'letter_lowercase' => $lo,
                'sound_url'        => "/sounds/alphabet/$lo.mp3",
                'example_word'     => $words[$l],
            ]);
        }

        // Numbers 1-10
        $numberWords = ['Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit', 'Neuf', 'Dix'];
        for ($i = 1; $i <= 10; $i++) {
            DB::table('numbers')->insert([
                'value'     => $i,
                'word'      => $numberWords[$i - 1],
                'sound_url' => "/sounds/numbers/$i.mp3",
            ]);
        }

        // Colors
        $colors = [
            ['name' => 'Rouge',   'hex' => '#FF0000'],
            ['name' => 'Bleu',    'hex' => '#0000FF'],
            ['name' => 'Vert',    'hex' => '#00FF00'],
            ['name' => 'Jaune',   'hex' => '#FFFF00'],
            ['name' => 'Orange',  'hex' => '#FFA500'],
            ['name' => 'Violet',  'hex' => '#800080'],
            ['name' => 'Rose',    'hex' => '#FFC0CB'],
            ['name' => 'Noir',    'hex' => '#000000'],
        ];
        foreach ($colors as $c) {
            DB::table('colors')->insert([
                'name'      => $c['name'],
                'hex_code'  => $c['hex'],
                'sound_url' => '/sounds/colors/' . strtolower($c['name']) . '.mp3',
            ]);
        }
    }
}
