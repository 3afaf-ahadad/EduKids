<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Progress;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        $children = $request->user()->children()->get();

        $totals = [
            'alphabet' => \App\Models\Alphabet::count(), // 26
            'number'   => \App\Models\Number::count(),   // 10
            'color'    => \App\Models\Color::count(),    // 8
        ];

        $data = $children->map(function ($child) use ($totals) {
            $completed = Progress::where('child_id', $child->id)
                ->where('completed', true)
                ->selectRaw('content_type, count(*) as count')
                ->groupBy('content_type')
                ->pluck('count', 'content_type');

            return [
                'id'   => $child->id,
                'name' => $child->name,
                'age'  => $child->age,
                'progress' => [
                    'alphabet' => [
                        'completed' => $completed['alphabet'] ?? 0,
                        'total'     => $totals['alphabet'],
                    ],
                    'numbers' => [
                        'completed' => $completed['number'] ?? 0,
                        'total'     => $totals['number'],
                    ],
                    'colors' => [
                        'completed' => $completed['color'] ?? 0,
                        'total'     => $totals['color'],
                    ],
                ],
            ];
        });

        return response()->json($data);
    }
}