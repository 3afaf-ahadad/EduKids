<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Child;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ChildController extends Controller
{
    public function index(Request $request)
    {
        $children = $request->user()->children()->with('progress')->get();
        return response()->json($children);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'age'  => 'nullable|integer|min:1|max:12',
        ]);

        $parent = $request->user();

        if ($parent->children()->count() >= 5) {
            return response()->json(['message' => 'Vous avez déjà 5 enfants'], 422);
        }

        $childUser = User::create([
            'name'     => $request->name,
            'email'    => 'child_' . $parent->id . '_' . now()->timestamp . '@edukids.local',
            'password' => Hash::make('password'),
            'role'     => 'enfant',
        ]);

        $child = $parent->children()->create([
            'name'  => $request->name,
            'age'   => $request->age,
            'user_id' => $childUser->id,
        ]);

        return response()->json($child, 201);
    }

    public function update(Request $request, Child $child)
    {
        $this->authorize('update', $child);

        $request->validate(['name' => 'required|string|max:255']);
        $child->update(['name' => $request->name]);

        return response()->json($child);
    }

    public function destroy(Child $child)
    {
        $this->authorize('delete', $child);

        $child->account()->delete();
        $child->delete();

        return response()->json(null, 204);
    }
}