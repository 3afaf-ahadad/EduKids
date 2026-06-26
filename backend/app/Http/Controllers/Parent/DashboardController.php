<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Progress;

class DashboardController extends Controller
{
    public function stats(Request $request)
{
    $children = $request->user()->children()->with('account')->get();

    $totals = [
        'alphabet' => \App\Models\Alphabet::count(),
        'number'   => \App\Models\Number::count(),
        'color'    => \App\Models\Color::count(),
    ];

    // Fetch ALL progress for these children in ONE query
    $childIds = $children->pluck('id');
    $allProgress = Progress::whereIn('child_id', $childIds)
        ->where('completed', true)
        ->selectRaw('child_id, content_type, count(*) as count')
        ->groupBy('child_id', 'content_type')
        ->get();

    // Group by child_id for quick lookup
    $progressByChild = $allProgress->groupBy('child_id');

    $data = $children->map(function ($child) use ($totals, $progressByChild) {
        $childProgress = $progressByChild->get($child->id, collect([]));
        $completed = $childProgress->pluck('count', 'content_type');

        return [
            'id'   => $child->id,
            'name' => $child->name,
            'age'  => $child->age,
            'email'    => $child->account->email ?? null,
            'password' => $child->account->plain_password ?? null,
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