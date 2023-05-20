<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Padlet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EntryController extends Controller
{
    /**
     * get all entries for a specific padlet
     */
    public function getEntries($id): JsonResponse
    {
        $padlet = Padlet::with(['entries.comments', 'entries.ratings'])->where('id', $id)->first();
        $entries = $padlet->entries;
        return response()->json($entries, 200);
    }

    /**
     * create new entry
     */
    public function saveEntry(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $entry = Entry::create($request->all());

            DB::commit();
            return response()->json($entry, 201);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving entry failed: " . $e->getMessage(), 420);
        }
    }


    /**
     * delete entry
     */
    public function deleteEntry(string $id) : JsonResponse {
        $entry = Entry::where('id', $id)->first();
        if ($entry != null) {
            $entry->delete();
            return response()->json('Eentry (' . $id . ') successfully deleted', 200);
        }
        else
            return response()->json('Entry could not be deleted - it does not exist', 422);
    }



}
