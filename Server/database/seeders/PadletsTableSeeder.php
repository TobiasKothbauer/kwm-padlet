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
        $padlet1->name = "My first Padlet";
        $padlet1->isPublic = true;

        $padlet2 = new Padlet();
        $padlet2->name = "second Padlet";
        $padlet2->isPublic = false;

        /* user id to padlet */
        $user = User::first();
        $user2 = User::find(2);
        $padlet1->user()->associate($user);
        $padlet2->user()->associate($user2);

        $padlet1->save();
        $padlet2->save();

        // add entries to padlet
        $entry1 = new Entry();
        $entry1->title = "title1";
        $entry1->text = "entry text";

        $entry2 = new Entry();
        $entry2->title = "title2";
        $entry2->text = "entry text 2";

        $entry3 = new Entry();
        $entry3->title = "Eintrag für 2tes Padlet";
        $entry3->text = "das 2te padlet ist viel cooler als das 1te";

        $padlet1->entries()->saveMany([$entry1, $entry2]);
        $padlet2->entries()->saveMany([$entry3]);

        // add all users
        $users = User::all()->pluck("id");
        $padlet1->users()->sync($users);
        $padlet2->users()->sync($users);


        // add comments to entry
        $comment1 = new Comment();
        $comment1->comment = "great entry!";

        $comment2 = new Comment();
        $comment2->comment = "great entry again!";

        $entry1->comments()->saveMany([$comment1, $comment2]);


        // add ratings to entry
        $rating1 = new Rating();
        $rating1->rating = 3;

        $rating2 = new Rating();
        $rating2->rating = 1;

        $entry1->ratings()->saveMany([$rating1, $rating2]);

    }
}
