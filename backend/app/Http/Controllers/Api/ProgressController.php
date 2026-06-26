<?php

// app/Http/Controllers/Api/ProgressController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Progress;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    public function index(Request $request)
{
    $child = $request->user()->child;
    $progress = Progress::where('child_id', $child->id)
        ->where('completed', true)
        ->selectRaw('content_type, count(*) as count')
        ->groupBy('content_type')
        ->pluck('count', 'content_type');

    return response()->json([
        'alphabet' => $progress['alphabet'] ?? 0,
        'number'   => $progress['number'] ?? 0,
        'color'    => $progress['color'] ?? 0,
    ]);
}
    public function store(Request $request)
    {
        $request->validate([
            'content_type' => 'required|in:alphabet,number,color',
            'content_id'   => 'required|integer',
        ]);

        $child = $request->user()->child;

        $progress = Progress::firstOrCreate([
            'child_id'     => $child->id,
            'content_type' => $request->content_type,
            'content_id'   => $request->content_id,
        ]);

        $progress->increment('attempts');

        if ($request->content_type === 'alphabet' && $progress->attempts >= 3) {
            $progress->completed = true;
        } elseif (in_array($request->content_type, ['number', 'color'])) {
            $progress->completed = true; // single correct interaction
        }
        $progress->save();

        return response()->json($progress);
    }
}