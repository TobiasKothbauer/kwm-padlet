<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Padlet;
use App\Models\User;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;

class RightController extends Controller
{
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
