<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Entry;
use App\Models\Image;
use App\Models\Padlet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PadletController extends Controller
{

    /*
        public function index(): JsonResponse{
        /*
         * load all books and relations (images, ...) with eager loading
         * -> alles mitschicken, egal ob client es braucht oder nicht

        $padlets = Padlet::with(['entries', 'users', 'user'])->get();
        // with sagt jetzt dem Model, dass er die beziehungen gleich mitladen soll
        $entries = Entry::with(['comments', 'ratings'])->get();
        return \response()->json([$padlets, $entries], 200);

    }
     */

    public function index(): JsonResponse
    {
        $padlets = Padlet::with(['user'])->get();
        return \response()->json($padlets, 200);
    }

    /*
        public function index(): JsonResponse
        {
            //$padlets = Padlet::with(['users', 'user'])->get();
            $padlets = Padlet::with(['users'])->get();

            // Get the IDs of all the padlets
            $padletIds = $padlets->pluck('id');

            // Load the entries with their comments and ratings
            $entries = Entry::with(['comments', 'ratings'])->whereIn('padlet_id', $padletIds)->get();

            // Group the entries by padlet ID
            $groupedEntries = $entries->groupBy('padlet_id');

            // Assign the entries to the corresponding padlet
            $padlets->each(function ($padlet) use ($groupedEntries) {
                $padlet->entries = $groupedEntries->get($padlet->id);
            });

            // Return the modified padlets as the response
            return response()->json(['padlets' => $padlets], 200);
        }
    */

        public function findById($id): JsonResponse
        {
            $padlet = Padlet::with(['user'])->where('id', $id)->first();

            return response()->json($padlet, 200);
        }

        /*
        public function findById($id): JsonResponse
        {
            // Padlet mit der entsprechenden ID und den zugehörigen Beziehungen (users, user) abrufen
            //$padlet = Padlet::with(['users', 'user'])->find($id);
            $padlet = Padlet::with(['users', 'user'])->find($id);

            // Überprüfen, ob das Padlet existiert
            if (!$padlet) {
                // Fehlermeldung zurückgeben, falls das Padlet nicht gefunden wurde
                return response()->json(['message' => 'Padlet not found'], 404);
            }

            // Entries mit ihren Kommentaren und Bewertungen für die angegebene padlet_id laden
            $entries = Entry::with(['comments', 'ratings'])->where('padlet_id', $id)->get();

            // Die geladenen Entries dem Padlet zuweisen
            $padlet->entries = $entries;

            // JSON-Response zurückgeben, das das Padlet mit den dazugehörigen Entries enthält
            return response()->json(['padlet' => $padlet], 200);
        }
    */

    /**
     * create new Padlet
     */
    public function save(Request $request) : JsonResponse {
        $request = $this->parseRequest($request);
        /*+
        * use a transaction for saving model including relations
        * if one query fails, complete SQL statements will be rolled back
        */
        DB::beginTransaction();
        try {
            $padlet = Padlet::create($request->all());

            /* save entries
            if (isset($request['entries']) && is_array($request['entries'])) {
                foreach ($request['entries'] as $entry) {
                    $result =
                        Entry::firstOrNew(['text'=>$entry['text']]);
                    $padlet->entries()->save($result);
                }
            }
*/

            DB::commit();
            // return a vaild http response
            return response()->json($padlet, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving padlet failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * update Padlet
     */
    public function update(Request $request, string $id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $padlet = Padlet::with(['entries', 'users'])
                ->where('id', $id)->first();
            if ($padlet != null) {
                $request = $this->parseRequest($request);
                $padlet->update($request->all());

                /*update users
                $ids = [];
                if (isset($request['users']) && is_array($request['users'])) {
                    foreach ($request['users'] as $user) {
                        array_push($ids,$user['id']);
                    }
                }
                $padlet->users()->sync($ids);
                $padlet->save();
                */

                DB::commit();
                $padlet = Padlet::with(['entries', 'users'])
                    ->where('id', $id)->first();
                // return a vaild http response
                return response()->json($padlet, 201);
            }
            return response()->json("Padlet not found: ", 420);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating Padlet failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * delete Padlet
     */
    public function delete(string $id) : JsonResponse {
        $padlet = Padlet::where('id', $id)->first();
        if ($padlet != null) {
            $padlet->delete();
            return response()->json('padlet (' . $id . ') successfully deleted', 200);
        }
        else
            return response()->json('padlet could not be deleted - it does not exist', 422);
    }


    private function parseRequest(Request $request) : Request {
        // get date and convert it - its in ISO 8601, e.g. "2018-01-01T23:00:00.000Z"
        $date = new \DateTime($request->creation_date);
        $request['creation_date'] = $date;
        return $request;
    }


}
