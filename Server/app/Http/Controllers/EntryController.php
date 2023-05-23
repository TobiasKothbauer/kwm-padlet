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

    /**
     * get all comments for a specific entry
     */
    public function getComments($id): JsonResponse
    {
        $entry = Entry::with(['comments'])->where('id', $id)->first();
        $comments = $entry->comments;
        return response()->json($comments, 200);
    }

    /**
     * get all ratings for a specific entry
     */
    public function getRatings($id): JsonResponse
    {
        $entry = Entry::with(['ratings'])->where('id', $id)->first();
        $ratings = $entry->ratings;
        return response()->json($ratings, 200);
    }

    /**
     * get entry by Id
     */
    public function getEntryById($id): JsonResponse
    {
        $entry = Entry::where('id', $id)->first();

        return response()->json($entry, 200);
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
     * create new Comment
     */
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

    /**
     * create new Rating
     */
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
     * update Entry
     */
    public function updateEntry(Request $request, string $entryId) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $entry = Entry::where('id', $entryId)->first();
            if ($entry != null) {
                $entry->update($request->all());

                DB::commit();
                $entry = Entry::where('id', $entryId)->first();
                // return a vaild http response
                return response()->json($entry, 201);
            }
            return response()->json("Entry not found: ", 420);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating Entry failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * update Comment
     */
    public function updateComment(Request $request, string $Id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $comment = Comment::where('id', $Id)->first();
            if ($comment != null) {
                $comment->update($request->all());

                DB::commit();
                $comment = Comment::where('id', $Id)->first();
                // return a vaild http response
                return response()->json($comment, 201);
            }
            return response()->json("Comment not found: ", 420);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating Comment failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * update Rating
     */
    public function updateRating(Request $request, string $id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $rating = Rating::where('id', $id)->first();
            if ($rating != null) {
                $rating->update($request->all());

                DB::commit();
                $rating = Rating::where('id', $id)->first();
                // return a vaild http response
                return response()->json($rating, 201);
            }
            return response()->json("Rating not found: ", 420);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating Rating failed: " . $e->getMessage(), 420);
        }
    }


    /**
     * delete entry
     */
    public function deleteEntry(string $id) : JsonResponse {
        $entry = Entry::where('id', $id)->first();
        if ($entry != null) {
            $entry->delete();
            return response()->json('Entry (' . $id . ') successfully deleted', 200);
        }
        else
            return response()->json('Entry could not be deleted - it does not exist', 422);
    }

    /**
     * delete comment
     */
    public function deleteComment(string $id) : JsonResponse {
        $comment = Comment::where('id', $id)->first();
        if ($comment != null) {
            $comment->delete();
            return response()->json('Comment (' . $id . ') successfully deleted', 200);
        }
        else
            return response()->json('Comment could not be deleted - it does not exist', 422);
    }

    /**
     * delete rating
     */
    public function deleteRating(string $id) : JsonResponse {
        $rating = Rating::where('id', $id)->first();
        if ($rating != null) {
            $rating->delete();
            return response()->json('Rating (' . $id . ') successfully deleted', 200);
        }
        else
            return response()->json('Rating could not be deleted - it does not exist', 422);
    }




}
