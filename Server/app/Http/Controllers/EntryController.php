<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Padlet;
use App\Models\Comment;
use App\Models\Rating;
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

    public function getComments($id): JsonResponse
    {
        $entry = Entry::with(['comments'])->where('id', $id)->first();
        $comments = $entry->comments;
        return response()->json($comments, 200);
    }

    public function getRatings($id): JsonResponse
    {
        $entry = Entry::with(['ratings'])->where('id', $id)->first();
        $ratings = $entry->ratings;
        return response()->json($ratings, 200);
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

    public function saveComment(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $comment = Comment::create($request->all());

            DB::commit();
            return response()->json($comment, 201);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving comment failed: " . $e->getMessage(), 420);
        }
    }

    public function saveRating(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $rating = Rating::create($request->all());

            DB::commit();
            return response()->json($rating, 201);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving rating failed: " . $e->getMessage(), 420);
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
