<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * get all Users
     */
    public function getAllUsers(): JsonResponse
    {
        $users = User::all();
        return \response()->json($users, 200);
    }

    /**
     * get User by ID
     */
    public function getUser($id): JsonResponse
    {
        $user = User::where('id', $id)->first();
        return response()->json($user, 200);
    }

    /**
     * delete User
     */
    public function deleteUser(string $id) : JsonResponse {
        $user = User::where('id', $id)->first();
        if ($user != null) {
            $user->delete();
            return response()->json('User (' . $id . ') successfully deleted', 200);
        }
        else
            return response()->json('User could not be deleted - it does not exist', 422);
    }

    /**
     * create User
     */
    public function saveUser(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $user = User::create($request->all());

            DB::commit();
            return response()->json($user, 201);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving user failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * update User
     */
    public function updateUser(Request $request, string $userId) : JsonResponse {
        DB::beginTransaction();
        try {
            $user = User::where('id', $userId)->first();
            if ($user != null) {
                $user->update($request->all());

                DB::commit();
                $user = User::where('id', $userId)->first();
                // return a vaild http response
                return response()->json($user, 201);
            }
            return response()->json("User not found: ", 420);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating User failed: " . $e->getMessage(), 420);
        }
    }

}
