<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Entry;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Seeder;
use \App\Models\Padlet;

class PadletsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $padlet1 = new Padlet();
        $padlet1->name = "Essens-Padlet";
        $padlet1->isPublic = true;

        $padlet2 = new Padlet();
        $padlet2->name = "Sport-Padlet";
        $padlet2->isPublic = false;

        /* user id to padlet */
        $user = User::first();
        $user2 = User::find(2);
        $user3 = User::find(3);
        $padlet1->user()->associate($user);
        $padlet2->user()->associate($user2);

        $padlet1->save();
        $padlet2->save();

        // add entries to padlet
        $entry1 = new Entry();
        $entry1->title = "Schnitzel";
        $entry1->text = "Dieses Gericht wird klassischerweise so und so zubereitet.";

        $entry2 = new Entry();
        $entry2->title = "Vorschläge vegane Gerichte?";
        $entry2->text = "Vegane Ernährung ist schwierig, gibt es Vorschläge?";

        $entry3 = new Entry();
        $entry3->title = "Fußball - überberwertet?";
        $entry3->text = "Es gibt viele andere tolle Sportarten zu entdecken.";

        $padlet1->entries()->saveMany([$entry1, $entry2]);
        $padlet2->entries()->saveMany([$entry3]);

        // add all users
        /*
        $users = User::all()->pluck("id");
        $padlet1->users()->attach($users, ['right' => 'lesen']);
        $padlet2->users()->attach($users, ['right' => 'lesen']);
*/

        /* einzeln festlegen
        $padlet1->users()->attach($user, ['right' => 'lesen']);
        $padlet1->users()->attach($user2, ['right' => 'lesen']);
        $padlet1->users()->attach($user3, ['right' => 'lesen']);

        $padlet2->users()->attach($user, ['right' => 'editieren']);
        $padlet2->users()->attach($user2, ['right' => 'lesen']);
        $padlet2->users()->attach($user3, ['right' => 'lesen']);
        */



        // add comments to entry
        $comment1 = new Comment();
        $comment1->comment = "Mhh lecker!";

        $comment2 = new Comment();
        $comment2->comment = "Tofu eignet sich super";

        $entry1->comments()->saveMany([$comment1]);
        $entry2->comments()->saveMany([$comment2]);


        // add ratings to entry
        $rating1 = new Rating();
        $rating1->rating = 3;

        $rating2 = new Rating();
        $rating2->rating = 1;

        $entry1->ratings()->saveMany([$rating1]);
        $entry2->ratings()->saveMany([$rating2]);

    }
}
