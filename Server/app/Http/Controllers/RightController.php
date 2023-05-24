<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Padlet;
use App\Models\User;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class RightController extends Controller
{
    /**
     * Get the rights of a user
     */
    public function getUserRights($padlet_Id, $user_Id)
    {
        $user = User::find($user_Id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $rights = $user->padlets()->where('padlet_id', $padlet_Id)->pluck('right')->first();

        return response()->json(['right' => $rights]);
    }

    /**
     *  Set the right of a user for a padlet
     */
    public function setUserRights(Request $request, $padletId, $userId): JsonResponse {
        // Rechte-Wert aus der Anfrage entnehmen
        $right = $request->input('right');

        // Padlet und User mit übergebener Id suchen
        $padlet = Padlet::find($padletId);
        $user = User::find($userId);

        if (!$padlet || !$user) {
            return response()->json(['message' => 'Padlet oder Benutzer nicht gefunden.'], 404);
        }

        // Rechte aktualisieren
        $padlet->users()->syncWithoutDetaching([$user->id => ['right' => $right]]);

        return response()->json(['message' => 'Rechte wurden erfolgreich aktualisiert.'], 200);
    }
}
